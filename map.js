/**
 * Travel Itinerary Map & Dynamic UI Engine
 * Modular, reactive renderer built for Leaflet.js and Tailwind CSS
 */

const darkTileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const tileOptions = {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> | &copy; OpenStreetMap',
    subdomains: 'abcd',
    maxZoom: 19
};

// Global map store
const mapInstances = {};
const boundsMap = {};
const activeSubPlans = {};
let overviewMap = null;
let overviewBounds = null;

// Custom Glowing Pin
function createMarkerIcon(num, color) {
    return L.divIcon({
        className: 'custom-pin-container',
        html: `
            <div class="custom-pin" style="background-color: ${color}; color: #0b0f19; width: 26px; height: 26px; border: 2px solid #ffffff; box-shadow: 0 0 10px ${color}99;">
                ${num}
            </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -14]
    });
}

// Focus on location with smooth flyTo and auto-open popup
function focusLocation(mapKey, lat, lng) {
    const map = mapInstances[mapKey];
    if (!map) return;
    map.flyTo([lat, lng], 15, { duration: 1.0 });
    map.eachLayer(layer => {
        if (layer.getPopup && layer.getLatLng) {
            const p = layer.getLatLng();
            if (Math.abs(p.lat - lat) < 0.0005 && Math.abs(p.lng - lng) < 0.0005) {
                layer.openPopup();
            }
        }
    });
}

// Reset view bounds helper
function resetMapView(mapKeyOrMap, explicitBounds) {
    let map = typeof mapKeyOrMap === 'string' ? mapInstances[mapKeyOrMap] : mapKeyOrMap;
    let bounds = explicitBounds || (typeof mapKeyOrMap === 'string' ? boundsMap[mapKeyOrMap] : null);
    if (map && bounds) {
        map.fitBounds(bounds, { animate: true });
    }
}

// Switch main tab
function switchTab(targetId) {
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
    const panel = document.getElementById(`panel-${targetId}`);
    if (panel) panel.classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-sky-600', 'text-white', 'border-sky-500', 'bg-amber-600', 'border-amber-500');
        btn.classList.add('bg-slate-900', 'text-slate-300', 'border-slate-800');
    });

    const activeBtn = document.querySelector(`[data-target="${targetId}"]`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-800');
        if (targetId === 'runner') {
            activeBtn.classList.add('bg-amber-600', 'text-white', 'border-amber-500');
        } else {
            activeBtn.classList.add('bg-sky-600', 'text-white', 'border-sky-500');
        }
    }

    // Auto-fit bounds on tab switch
    setTimeout(() => {
        if (targetId === 'overview' && overviewMap && overviewBounds) {
            overviewMap.invalidateSize();
            overviewMap.fitBounds(overviewBounds, { animate: false });
        } else if (targetId.startsWith('day')) {
            const currentSubPlan = activeSubPlans[targetId];
            const mapKey = currentSubPlan ? `${targetId}_${currentSubPlan}` : targetId;
            if (mapInstances[mapKey] && boundsMap[mapKey]) {
                mapInstances[mapKey].invalidateSize();
                mapInstances[mapKey].fitBounds(boundsMap[mapKey], { animate: false });
            }
        }
    }, 120);

    if (window.lucide) lucide.createIcons();
}

// Switch sub-plan (e.g., Day 2 Plan A/B or Day 5 Option A/B)
function switchSubPlan(dayId, planId) {
    activeSubPlans[dayId] = planId;
    const parent = document.getElementById(`panel-${dayId}`);
    if (!parent) return;

    // Toggle subpanel visibility
    parent.querySelectorAll('.subplan-panel').forEach(p => p.classList.add('hidden'));
    const targetSubPanel = document.getElementById(`subpanel-${dayId}-${planId}`);
    if (targetSubPanel) targetSubPanel.classList.remove('hidden');

    // Toggle button active styles
    parent.querySelectorAll('.subplan-btn').forEach(btn => {
        btn.classList.remove('bg-sky-600', 'bg-emerald-600', 'bg-purple-600', 'bg-pink-600', 'text-white', 'shadow');
        btn.classList.add('text-slate-400', 'hover:text-white');
    });

    const activeBtn = document.getElementById(`btn-${dayId}-${planId}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-slate-400', 'hover:text-white');
        const activeColorClass = activeBtn.getAttribute('data-active-class') || 'bg-sky-600';
        activeBtn.classList.add(...activeColorClass.split(' ').filter(Boolean), 'text-white', 'shadow');
    }

    // Resize Leaflet Map
    const mapKey = `${dayId}_${planId}`;
    setTimeout(() => {
        if (mapInstances[mapKey] && boundsMap[mapKey]) {
            mapInstances[mapKey].invalidateSize();
            mapInstances[mapKey].fitBounds(boundsMap[mapKey], { animate: false });
        }
    }, 80);

    if (window.lucide) lucide.createIcons();
}

// Initialize Leaflet Map for a specific route
function initRouteMap(elementId, stops, color, mapKey) {
    const map = L.map(elementId, { zoomControl: true, scrollWheelZoom: false });
    L.tileLayer(darkTileUrl, tileOptions).addTo(map);

    const latLngs = [];
    stops.forEach(s => {
        const pos = [s.lat, s.lng];
        latLngs.push(pos);
        const marker = L.marker(pos, { icon: createMarkerIcon(s.id, color) }).addTo(map);
        marker.bindPopup(`
            <div class="text-xs">
                <strong class="text-sm font-bold text-white block mb-1">${s.name}</strong>
                <span class="text-slate-300 leading-relaxed">${s.desc}</span>
            </div>
        `);
    });

    if (latLngs.length > 0) {
        const polyline = L.polyline(latLngs, {
            color: color,
            weight: 4,
            opacity: 0.85,
            dashArray: '8, 8',
            lineJoin: 'round'
        }).addTo(map);

        const bounds = polyline.getBounds().pad(0.15);
        map.fitBounds(bounds);
        boundsMap[mapKey] = bounds;
    }

    mapInstances[mapKey] = map;
    return map;
}

// Generate Schedule Block HTML (Cards + Map + Route Flow)
function renderScheduleBlock(dayId, planOrDay, mapKey) {
    const stops = planOrDay.stops || [];
    const color = planOrDay.color || '#38bdf8';
    const googleMapsUrl = planOrDay.googleMapsUrl || '';
    const rainPlan = planOrDay.rainPlan || '';

    return `
        <!-- Route Flow Header Bar -->
        <div class="mb-5 bg-slate-950/80 p-3.5 sm:p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span class="text-slate-400 font-bold flex items-center gap-1">
                    <i data-lucide="milestone" class="w-4 h-4 text-sky-400"></i> 路徑順序：
                </span>
                ${stops.map((s, idx) => `
                    <button onclick="focusLocation('${mapKey}', ${s.lat}, ${s.lng})" class="bg-slate-800 hover:bg-sky-700 text-sky-300 hover:text-white px-2.5 py-1.5 rounded-lg transition text-xs flex items-center gap-1 font-medium">
                        ${s.shortName || s.name}
                    </button>
                    ${idx < stops.length - 1 ? '<span class="text-slate-600 text-xs">➔</span>' : ''}
                `).join('')}
            </div>
            ${googleMapsUrl ? `
                <a href="${googleMapsUrl}" target="_blank" class="bg-sky-600 hover:bg-sky-500 text-white font-bold px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow text-xs shrink-0">
                    <i data-lucide="navigation" class="w-3.5 h-3.5"></i> 開啟 Google 完整導航
                </a>
            ` : ''}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <!-- Timeline Cards (Left) -->
            <div class="lg:col-span-6 space-y-3.5 max-h-[640px] overflow-y-auto pr-1">
                ${stops.map(s => `
                    <div onclick="focusLocation('${mapKey}', ${s.lat}, ${s.lng})" class="cursor-pointer bg-slate-950/70 hover:bg-slate-800/70 border border-slate-800/80 hover:border-sky-500/50 rounded-xl p-4 transition-all duration-200">
                        <div class="flex items-center justify-between gap-2 mb-1.5">
                            <div class="flex items-center gap-2">
                                <span class="w-5 h-5 rounded-full flex items-center justify-center font-black text-[11px] text-slate-950" style="background-color: ${color}">
                                    ${s.id}
                                </span>
                                <span class="text-xs font-mono text-slate-300 font-bold">${s.time}</span>
                                <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">${s.categoryLabel || s.category}</span>
                            </div>
                            <span class="text-xs text-slate-400">停留 ${s.stay}</span>
                        </div>
                        <h3 class="text-sm font-bold text-white mb-1">${s.name}</h3>
                        <p class="text-xs text-slate-300 mb-2 leading-relaxed">${s.desc}</p>
                        <div class="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                            <span class="text-amber-400 flex items-center gap-1">
                                <i data-lucide="info" class="w-3.5 h-3.5"></i> ${s.tips}
                            </span>
                            ${s.mapsUrl ? `<a href="${s.mapsUrl}" target="_blank" onclick="event.stopPropagation()" class="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-bold">地點導航 <i data-lucide="external-link" class="w-3 h-3"></i></a>` : ''}
                        </div>
                    </div>
                `).join('')}

                ${rainPlan ? `
                    <div class="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                        <i data-lucide="cloud-rain" class="w-4 h-4 text-sky-400 shrink-0 mt-0.5"></i>
                        <span><strong>雨備方案</strong>：${rainPlan}</span>
                    </div>
                ` : ''}
            </div>

            <!-- Embedded Leaflet Map (Right) -->
            <div class="lg:col-span-6 space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span class="flex items-center gap-1 text-sky-400 font-bold">
                        <i data-lucide="map" class="w-3.5 h-3.5"></i> 即時路徑動態地圖
                    </span>
                    <button onclick="resetMapView('${mapKey}')" class="hover:text-white transition flex items-center gap-1">
                        <i data-lucide="maximize-2" class="w-3 h-3"></i> 重設全景視野
                    </button>
                </div>
                <div class="relative w-full h-[380px] lg:h-[600px] rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                    <div id="map-elem-${mapKey}" class="w-full h-full"></div>
                </div>
            </div>
        </div>
    `;
}

// DOM Ready: Bootstrap Everything
window.addEventListener('DOMContentLoaded', () => {
    // 1. Populate Header Information
    document.getElementById('trip-title').innerText = tripData.config.title;
    document.getElementById('trip-subtitle').innerText = tripData.config.subtitle;
    document.getElementById('trip-dates').innerText = tripData.config.dates;
    document.getElementById('trip-travelers').innerText = tripData.config.travelers;

    const highlightsContainer = document.getElementById('trip-highlights');
    if (highlightsContainer && tripData.config.highlights) {
        highlightsContainer.innerHTML = tripData.config.highlights.map(h => {
            const iconColor = h.color === 'sky' ? 'text-sky-400' : (h.color === 'teal' ? 'text-teal-400' : 'text-amber-400');
            return `
                <div class="bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800 text-slate-200 flex items-center gap-2">
                    <i data-lucide="${h.icon}" class="w-3.5 h-3.5 ${iconColor}"></i>
                    <span>${h.label}</span>
                </div>
            `;
        }).join('');
    }

    const navTabsContainer = document.getElementById('nav-tabs');
    const panelsContainer = document.getElementById('panels-container');

    // 2. Overview Tab Button
    const overviewBtn = document.createElement('button');
    overviewBtn.className = 'tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800';
    overviewBtn.setAttribute('data-target', 'overview');
    overviewBtn.innerHTML = `<i data-lucide="globe" class="w-4 h-4 text-sky-400"></i> 全島總覽地圖`;
    overviewBtn.onclick = () => switchTab('overview');
    navTabsContainer.appendChild(overviewBtn);

    // 3. Daily Tab Buttons & Panels
    tripData.days.forEach((day, idx) => {
        const isDefault = idx === 0;

        // Nav Button
        const btn = document.createElement('button');
        btn.className = `tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border ${
            isDefault ? 'bg-sky-600 text-white border-sky-500' : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
        }`;
        btn.setAttribute('data-target', day.id);
        btn.innerHTML = `<span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color: ${day.color}"></span> Day ${day.dayNum}`;
        btn.onclick = () => switchTab(day.id);
        navTabsContainer.appendChild(btn);

        // Daily Main Panel
        const panel = document.createElement('div');
        panel.id = `panel-${day.id}`;
        panel.className = `tab-panel space-y-6 ${isDefault ? '' : 'hidden'}`;

        // Panel Inner Container
        const card = document.createElement('div');
        card.className = 'bg-slate-900/80 backdrop-blur rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl';

        if (day.plans && day.plans.length > 0) {
            // Day with Sub-plans (e.g. Day 2 or Day 5)
            activeSubPlans[day.id] = day.plans[0].id;

            let toggleButtonsHtml = `
                <div class="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                    ${day.plans.map((p, pIdx) => {
                        const activeColor = p.color === '#10b981' ? 'bg-emerald-600' : (p.color === '#f472b6' ? 'bg-pink-600' : (p.color === '#c084fc' ? 'bg-purple-600' : 'bg-sky-600'));
                        return `
                            <button onclick="switchSubPlan('${day.id}', '${p.id}')" id="btn-${day.id}-${p.id}" data-active-class="${activeColor}" class="subplan-btn px-3.5 py-1.5 rounded-lg font-bold text-xs transition flex items-center gap-1.5 ${
                                pIdx === 0 ? `${activeColor} text-white shadow` : 'text-slate-400 hover:text-white'
                            }">
                                <span>${p.name}</span>
                            </button>
                        `;
                    }).join('')}
                </div>
            `;

            let subPanelsHtml = day.plans.map((p, pIdx) => `
                <div id="subpanel-${day.id}-${p.id}" class="subplan-panel space-y-5 ${pIdx === 0 ? '' : 'hidden'}">
                    <div class="p-3.5 rounded-xl border flex items-center justify-between flex-wrap gap-2" style="background-color: ${p.color}15; border-color: ${p.color}40;">
                        <div>
                            <span class="text-xs font-bold uppercase flex items-center gap-1" style="color: ${p.color};">
                                <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> ${p.name}
                            </span>
                            <h3 class="text-base sm:text-lg font-bold text-white mt-0.5">${p.title}</h3>
                        </div>
                        <span class="text-xs px-3 py-1 rounded-full border flex items-center gap-1" style="background-color: ${p.color}25; border-color: ${p.color}50; color: #f1f5f9;">
                            ${p.badge}
                        </span>
                    </div>

                    ${renderScheduleBlock(day.id, p, `${day.id}_${p.id}`)}
                </div>
            `).join('');

            card.innerHTML = `
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6">
                    <div>
                        <span class="px-2.5 py-1 rounded-full text-xs font-black tracking-wider uppercase" style="background-color: ${day.color}22; color: ${day.color};">
                            Day ${day.dayNum} ｜ ${day.date}
                        </span>
                        <h2 class="text-xl sm:text-2xl font-black text-white mt-1.5">${day.title}</h2>
                    </div>
                    ${toggleButtonsHtml}
                </div>
                ${subPanelsHtml}
            `;
        } else {
            // Standard Single Route Day
            card.innerHTML = `
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6">
                    <div>
                        <span class="px-2.5 py-1 rounded-full text-xs font-black tracking-wider uppercase" style="background-color: ${day.color}22; color: ${day.color};">
                            Day ${day.dayNum} ｜ ${day.date}
                        </span>
                        <h2 class="text-xl sm:text-2xl font-black text-white mt-1.5">${day.title}</h2>
                    </div>
                    <div class="text-right hidden md:block">
                        <span class="text-xs text-slate-400">住宿飯店</span>
                        <p class="font-bold text-sky-300 flex items-center gap-1"><i data-lucide="hotel" class="w-4 h-4"></i> ${day.hotel}</p>
                    </div>
                </div>
                ${renderScheduleBlock(day.id, day, day.id)}
            `;
        }

        panel.appendChild(card);
        panelsContainer.appendChild(panel);
    });

    // 4. Runner Routes Tab Button
    const runnerBtn = document.createElement('button');
    runnerBtn.className = 'tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border bg-slate-900 text-amber-400 border-slate-800 hover:bg-slate-800';
    runnerBtn.setAttribute('data-target', 'runner');
    runnerBtn.innerHTML = `<i data-lucide="activity" class="w-4 h-4 text-orange-400"></i> 🏃 晨跑路線`;
    runnerBtn.onclick = () => switchTab('runner');
    navTabsContainer.appendChild(runnerBtn);

    // 5. Checklist Tab Button
    const checklistBtn = document.createElement('button');
    checklistBtn.className = 'tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 text-emerald-400';
    checklistBtn.setAttribute('data-target', 'checklist');
    checklistBtn.innerHTML = `<i data-lucide="check-square" class="w-4 h-4 text-emerald-400"></i> 行前備忘`;
    checklistBtn.onclick = () => switchTab('checklist');
    navTabsContainer.appendChild(checklistBtn);

    // 6. Overview Map Panel
    const overviewPanel = document.createElement('div');
    overviewPanel.id = 'panel-overview';
    overviewPanel.className = 'tab-panel space-y-6 hidden';
    overviewPanel.innerHTML = `
        <div class="bg-slate-900/80 backdrop-blur rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
                <div>
                    <span class="px-2.5 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-sky-500/20 text-sky-400">
                        Overview Map
                    </span>
                    <h2 class="text-xl sm:text-2xl font-black text-white mt-1.5">全島行程路徑總覽</h2>
                </div>
                <div class="flex flex-wrap items-center gap-4">
                    <div class="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                        ${tripData.days.map(d => `
                            <span class="flex items-center gap-1.5">
                                <span class="w-3 h-3 rounded-full inline-block" style="background-color: ${d.color}"></span> Day ${d.dayNum}
                            </span>
                        `).join('')}
                    </div>
                    <button onclick="resetMapView(overviewMap, overviewBounds)" class="bg-slate-800 hover:bg-sky-700 text-sky-300 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 shadow">
                        <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i> 重設全景視野
                    </button>
                </div>
            </div>
            <div class="relative w-full h-[540px] rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                <div id="map-overview" class="w-full h-full"></div>
            </div>
            <p class="text-xs text-slate-400 text-center mt-3">
                💡 點擊地圖上的任意站點標記，即可檢視該站點詳細名稱、時間與行程介紹。
            </p>
        </div>
    `;
    panelsContainer.appendChild(overviewPanel);

    // 7. Runner Routes Panel
    const runnerPanel = document.createElement('div');
    runnerPanel.id = 'panel-runner';
    runnerPanel.className = 'tab-panel space-y-6 hidden';
    runnerPanel.innerHTML = `
        <div class="bg-slate-900/80 backdrop-blur rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <div class="mb-6 pb-4 border-b border-slate-800">
                <span class="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/50 flex items-center gap-1.5 w-fit">
                    <i data-lucide="activity" class="w-3.5 h-3.5"></i> Fitness 🏃
                </span>
                <h2 class="text-2xl font-black text-white mt-2">跑者專屬晨跑路線指南</h2>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                ${tripData.runnerRoutes.map(r => `
                    <div class="bg-slate-950/70 p-6 rounded-2xl border border-slate-800/80 space-y-3">
                        <span class="text-xs font-bold flex items-center gap-1" style="color: ${r.color}">
                            <i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${r.dayLabel}
                        </span>
                        <h3 class="text-base sm:text-lg font-bold text-slate-100">${r.title}</h3>
                        <div class="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            <p>✨ <strong>路線規劃</strong>：${r.route}</p>
                            <p>📌 <strong>路線亮點</strong>：${r.highlights}</p>
                            <p class="text-xs font-medium text-slate-400">配速建議：<span class="text-amber-400 font-bold">${r.pace}</span></p>
                        </div>
                    </div>
                `).join('')}
            </div>

            ${tripData.runnerAdvice ? `
                <div class="mt-6 bg-sky-950/40 p-4 rounded-xl border border-sky-900/60 flex items-start gap-3">
                    <i data-lucide="sparkles" class="w-5 h-5 text-sky-400 shrink-0 mt-0.5"></i>
                    <div class="text-xs sm:text-sm text-sky-200">
                        <p class="font-bold mb-1">跑者裝備叮嚀：</p>
                        <p>${tripData.runnerAdvice}</p>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    panelsContainer.appendChild(runnerPanel);

    // 8. Checklist Panel with interactive checkboxes & localStorage save
    const checklistPanel = document.createElement('div');
    checklistPanel.id = 'panel-checklist';
    checklistPanel.className = 'tab-panel space-y-6 hidden';
    checklistPanel.innerHTML = `
        <div class="bg-slate-900/80 backdrop-blur rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <div class="border-b border-slate-800 pb-4 mb-6 flex items-center justify-between flex-wrap gap-2">
                <div>
                    <span class="px-2.5 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-emerald-500/20 text-emerald-400">
                        Packing & Essentials
                    </span>
                    <h2 class="text-2xl font-black text-white mt-1.5">行前準備與隨身裝備清單</h2>
                </div>
                <button onclick="resetChecklist()" class="text-xs text-slate-400 hover:text-white transition flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                    <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> 重設勾選狀態
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${tripData.checklist.map((group, gIdx) => `
                    <div class="bg-slate-950/70 border border-slate-800/80 rounded-xl p-5">
                        <h3 class="text-sm font-bold text-white mb-3.5 flex items-center gap-2 border-b border-slate-800 pb-2">
                            <i data-lucide="${group.icon || 'check-circle'}" class="w-4 h-4 text-emerald-400"></i> ${group.category}
                        </h3>
                        <ul class="space-y-2.5 text-xs text-slate-300">
                            ${group.items.map((item, iIdx) => {
                                const checkKey = `okinawa_check_${gIdx}_${iIdx}`;
                                return `
                                    <li class="flex items-center gap-2.5 cursor-pointer select-none" onclick="toggleCheck('${checkKey}')">
                                        <input type="checkbox" id="${checkKey}" class="w-4 h-4 rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-0 cursor-pointer pointer-events-none">
                                        <label for="${checkKey}" id="lbl-${checkKey}" class="cursor-pointer transition leading-snug">${item}</label>
                                    </li>
                                `;
                            }).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    panelsContainer.appendChild(checklistPanel);

    // 9. Initialize All Leaflet Maps
    tripData.days.forEach(day => {
        if (day.plans && day.plans.length > 0) {
            day.plans.forEach(plan => {
                initRouteMap(`map-elem-${day.id}_${plan.id}`, plan.stops, plan.color, `${day.id}_${plan.id}`);
            });
        } else {
            initRouteMap(`map-elem-${day.id}`, day.stops, day.color, day.id);
        }
    });

    // 10. Setup Overview Map
    overviewMap = L.map('map-overview', { zoomControl: true, scrollWheelZoom: false });
    L.tileLayer(darkTileUrl, tileOptions).addTo(overviewMap);

    const allPoints = [];
    tripData.days.forEach(day => {
        const primaryStops = day.plans ? day.plans[0].stops : day.stops;
        const color = day.color;
        const latLngs = [];

        primaryStops.forEach(s => {
            const pos = [s.lat, s.lng];
            latLngs.push(pos);
            allPoints.push(pos);
            const marker = L.marker(pos, { icon: createMarkerIcon(s.id, color) }).addTo(overviewMap);
            marker.bindPopup(`
                <div class="text-xs">
                    <span class="text-[10px] uppercase font-bold text-sky-400 block mb-0.5">Day ${day.dayNum}</span>
                    <strong class="text-sm font-bold text-white block mb-1">${s.name}</strong>
                    <span class="text-slate-300">${s.desc}</span>
                </div>
            `);
        });

        L.polyline(latLngs, { color: color, weight: 3, opacity: 0.65, dashArray: '6, 6' }).addTo(overviewMap);
    });

    if (allPoints.length > 0) {
        overviewBounds = L.latLngBounds(allPoints).pad(0.12);
        overviewMap.fitBounds(overviewBounds);
    }

    // 11. Restore Checkbox states from LocalStorage
    restoreChecklist();

    // 12. Create Lucide Icons
    if (window.lucide) lucide.createIcons();

    // 13. Ensure initial map (Day 1) renders and fits bounds correctly
    setTimeout(() => {
        const firstDayId = tripData.days[0].id;
        if (mapInstances[firstDayId] && boundsMap[firstDayId]) {
            mapInstances[firstDayId].invalidateSize();
            mapInstances[firstDayId].fitBounds(boundsMap[firstDayId], { animate: false });
        }
    }, 150);
});

// Checklist State Helpers
function toggleCheck(key) {
    const chk = document.getElementById(key);
    const lbl = document.getElementById(`lbl-${key}`);
    if (!chk || !lbl) return;
    chk.checked = !chk.checked;
    if (chk.checked) {
        lbl.classList.add('line-through', 'text-slate-500');
        localStorage.setItem(key, 'true');
    } else {
        lbl.classList.remove('line-through', 'text-slate-500');
        localStorage.removeItem(key);
    }
}

function restoreChecklist() {
    tripData.checklist.forEach((g, gIdx) => {
        g.items.forEach((_, iIdx) => {
            const key = `okinawa_check_${gIdx}_${iIdx}`;
            if (localStorage.getItem(key) === 'true') {
                const chk = document.getElementById(key);
                const lbl = document.getElementById(`lbl-${key}`);
                if (chk) chk.checked = true;
                if (lbl) lbl.classList.add('line-through', 'text-slate-500');
            }
        });
    });
}

function resetChecklist() {
    tripData.checklist.forEach((g, gIdx) => {
        g.items.forEach((_, iIdx) => {
            const key = `okinawa_check_${gIdx}_${iIdx}`;
            localStorage.removeItem(key);
            const chk = document.getElementById(key);
            const lbl = document.getElementById(`lbl-${key}`);
            if (chk) chk.checked = false;
            if (lbl) lbl.classList.remove('line-through', 'text-slate-500');
        });
    });
}
