/**
 * Travel Itinerary Data Configuration - Okinawa 2026
 * 💡 提示：未來修改行程、時間、地點、備註或清單時，只需編輯此檔案！
 */
const tripData = {
    config: {
        title: "2026 沖繩 5 天 4 夜行程規劃",
        subtitle: "秋日慢活之旅 9/29 - 10/3 ｜ 互動地圖與路線指南",
        dates: "2026.09.29 (二) - 10.03 (六)",
        flights: "去程 9/29 14:40 抵達 OKA ｜ 回程 10/3 15:50 起飛返台",
        travelers: "哲健 & 周庭",
        highlights: [
            { label: "Day 1-2 住宿：那霸嘉新酒店 (Hotel Collective)", icon: "hotel", color: "sky" },
            { label: "Day 3-4 住宿：恩納水感酒店 (AQUASENSE)", icon: "hotel", color: "teal" },
            { label: "交通規劃：Day 3 取車 ➔ Day 5 機場還車", icon: "car", color: "amber" }
        ]
    },
    days: [
        {
            id: "day1",
            dayNum: 1,
            date: "9/29 (週二)",
            title: "抵達那霸 ✕ 國際通散策 ✕ 極上牛神戶牛饗宴",
            color: "#38bdf8",
            hotel: "那霸嘉新酒店 (Hotel Collective)",
            googleMapsUrl: "https://www.google.com/maps/dir/那霸機場/Hotel+Collective+Naha/國際通/Gokujougyu+Naha/Hotel+Collective+Naha",
            rainPlan: "若傍晚落雨，辦理入住後直接逛嘉新酒店對面的琉貿百貨 (Palette Kumoji) 與國際通室內拱廊商街，搭乘全程遮雨單軌前往小祿站享用燒肉。",
            stops: [
                {
                    id: 1,
                    time: "14:40",
                    name: "那霸機場 (OKA)",
                    shortName: "機場 ✈️",
                    category: "transport",
                    categoryLabel: "航班抵達",
                    desc: "14:40 抵達沖繩，入境後搭乘單軌電車前往嘉新酒店辦理入住放行李（單軌至縣廳前站，步行 7 分鐘）。",
                    lat: 26.2064,
                    lng: 127.6459,
                    stay: "40分",
                    tips: "縣廳前站下車步行 7 分鐘，直通國際通正中心",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Naha+Airport"
                },
                {
                    id: 2,
                    time: "16:00",
                    name: "那霸嘉新酒店 (Hotel Collective)",
                    shortName: "嘉新酒店 🏨",
                    category: "hotel",
                    categoryLabel: "飯店入住",
                    desc: "辦理入住與行李整理。位於那霸國際通正核心，客房寬敞新穎，地理位置極佳。",
                    lat: 26.2162,
                    lng: 127.6872,
                    stay: "45分",
                    tips: "大廳氣派，設施含露天泳池與三溫暖，退房前可先寄放行李",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Collective+Naha"
                },
                {
                    id: 3,
                    time: "17:00",
                    name: "浮島通 / 國際通散策",
                    shortName: "國際通散策 🛍️",
                    category: "shopping",
                    categoryLabel: "巷弄散策",
                    desc: "漫步於巷弄獨立選物店、手工藝小店與手沖咖啡，享受微涼初秋傍晚（伴手禮留至 Day 5 再買）。",
                    lat: 26.2148,
                    lng: 127.6891,
                    stay: "90分",
                    tips: "巷弄文青小店多，氛圍悠閒舒服，暫不買伴手禮輕鬆放空",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=26.2148,127.6891"
                },
                {
                    id: 4,
                    time: "18:30",
                    name: "沖繩燒肉 極上牛 (小祿站)",
                    shortName: "極上牛 🥩",
                    category: "food",
                    categoryLabel: "晚餐燒肉",
                    desc: "晚餐：頂級神戶牛/本土黑毛和牛燒肉。單軌至小祿站（步行3分），專賣神戶牛、松阪牛等日本三大頂級和牛。飯後可逛小祿 AEON 超市散步。",
                    lat: 26.1963,
                    lng: 127.6669,
                    stay: "100分",
                    tips: "🔥 務必提早預約！避開沖繩本島牛，主打本土三大頂級和牛",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gokujougyu+Naha"
                },
                {
                    id: 5,
                    time: "21:00",
                    name: "那霸嘉新酒店 (返回休息)",
                    shortName: "返回嘉新 🏨",
                    category: "hotel",
                    categoryLabel: "夜宿飯店",
                    desc: "單軌小祿站搭回縣廳前站，步行回飯店休息，養精蓄銳迎接次日晨跑與散策。",
                    lat: 26.2162,
                    lng: 127.6872,
                    stay: "過夜",
                    tips: "房內隔音絕佳，享受五星級舒適床鋪好好放鬆",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Collective+Naha"
                }
            ]
        },
        {
            id: "day2",
            dayNum: 2,
            date: "9/30 (週三)",
            title: "選擇您的 Day 2 旅行節奏（雙方案對比）",
            color: "#60a5fa",
            hotel: "那霸嘉新酒店 (Hotel Collective)",
            plans: [
                {
                    id: "planA",
                    name: "方案 A：那霸古都慢活",
                    title: "那霸古都慢活 ✕ 沖繩飯糰 ✕ 港景海鮮居酒屋",
                    badge: "輕鬆優雅 步行與單軌",
                    color: "#38bdf8",
                    googleMapsUrl: "https://www.google.com/maps/dir/Hotel+Collective+Naha/奧武山公園/首里城公園/ポークたまごおにぎり本店+牧志市場店/波上宮/琉球海鮮酒場+琉星/Hotel+Collective+Naha",
                    rainPlan: "若遇雨，參觀單軌直達的【沖繩縣立博物館・美術館 (OkiMu)】（おもろまち站直達），現代建築藝術極美，常設展與特展兼具，下雨天室內舒適靜謐。",
                    stops: [
                        {
                            id: 1,
                            time: "06:30",
                            name: "那霸嘉新酒店 (晨跑出發)",
                            shortName: "嘉新出發 🏨",
                            category: "activity",
                            categoryLabel: "晨跑起點",
                            desc: "嘉新酒店出發 ➔ 久茂地川 ➔ 奧武山公園繞圈（約 5 km），跑後回酒店盥洗，悠閒享用飯店精緻早餐。",
                            lat: 26.2162,
                            lng: 127.6872,
                            stay: "60分",
                            tips: "清晨久茂地川涼爽平靜，回酒店盥洗後享用精緻早餐",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Collective+Naha"
                        },
                        {
                            id: 2,
                            time: "07:00",
                            name: "奧武山公園 (清晨跑折返點)",
                            shortName: "奧武山 🏃",
                            category: "activity",
                            categoryLabel: "跑道折返",
                            desc: "清晨 5-6 km 跑步，平整橡膠跑道與綠蔭，回程可順路探訪波之上海灘周邊。",
                            lat: 26.2045,
                            lng: 127.6763,
                            stay: "30分",
                            tips: "專用橡膠慢跑道保護膝蓋，綠蔭充足，清晨空氣清爽",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Onoyama+Park"
                        },
                        {
                            id: 3,
                            time: "10:30",
                            name: "首里城公園",
                            shortName: "首里城 🏯",
                            category: "spot",
                            categoryLabel: "文化散策",
                            desc: "上午文化散策，古城牆與市景俯瞰。搭單軌至首里站轉乘公車或步行，漫步於琉球王國古石階城牆，俯瞰那霸市區與海港全景。",
                            lat: 26.2170,
                            lng: 127.7195,
                            stay: "90分",
                            tips: "木造正殿復原工程開放參觀，琉球王國古蹟底蘊深厚",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shurijo+Castle"
                        },
                        {
                            id: 4,
                            time: "12:30",
                            name: "ポーたま 牧志市場店 (沖繩飯糰)",
                            shortName: "牧志飯糰 🍙",
                            category: "food",
                            categoryLabel: "午餐輕食",
                            desc: "午餐輕食：現點現做炸蝦明太子／苦瓜天婦羅口味飯糰，道地且份量適中。",
                            lat: 26.2145,
                            lng: 127.6888,
                            stay: "45分",
                            tips: "現點現做熱騰騰，若早餐吃得飽亦可外帶當下午輕食",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pork+Tamago+Onigiri+Makishi"
                        },
                        {
                            id: 5,
                            time: "15:00",
                            name: "波上宮 ＆ 波之上海灘",
                            shortName: "波上宮海灘 🌊",
                            category: "spot",
                            categoryLabel: "海景參拜",
                            desc: "下午巨岩神社參拜與海灘散步放空。漫步吹海風看斷崖海景，午後可找間文青咖啡館小歇（oHacorté 留至 Day 5 享用）。",
                            lat: 26.2207,
                            lng: 127.6713,
                            stay: "60分",
                            tips: "矗立於巨岩上的神社極具特色，海灘漫步放空放鬆",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Naminoue+Shrine"
                        },
                        {
                            id: 6,
                            time: "18:30",
                            name: "琉球海鮮酒場 琉星",
                            shortName: "海鮮居酒屋 🍻",
                            category: "food",
                            categoryLabel: "晚餐居酒屋",
                            desc: "晚餐：久茂地當季現流海鮮居酒屋，或【ぼんぢりや 一銀通店】，品嚐阿古豬料理與海鮮，現場候位即可。",
                            lat: 26.2168,
                            lng: 127.6834,
                            stay: "90分",
                            tips: "現流生魚片與沖繩料理風味極佳，距飯店步行 5 分鐘",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=琉球海鮮酒場+琉星"
                        },
                        {
                            id: 7,
                            time: "20:30",
                            name: "那霸嘉新酒店 (返回休息)",
                            shortName: "返回嘉新 🏨",
                            category: "hotel",
                            categoryLabel: "夜宿飯店",
                            desc: "步行返回嘉新酒店 (Hotel Collective)，結束充實且慢活的市區文化一日遊。",
                            lat: 26.2162,
                            lng: 127.6872,
                            stay: "過夜",
                            tips: "步行輕鬆回房休息，無交通奔波負擔",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Collective+Naha"
                        }
                    ]
                },
                {
                    id: "planB",
                    name: "方案 B：渡嘉敷島跳島",
                    title: "渡嘉敷島「慶良間藍」跳島一日遊 🏝️",
                    badge: "需提早 1-2 個月官網預訂高速船票",
                    color: "#10b981",
                    googleMapsUrl: "https://www.google.com/maps/dir/Hotel+Collective+Naha/泊港/渡嘉敷港/阿波連海灘/琉球海鮮酒場+琉星/Hotel+Collective+Naha",
                    rainPlan: "若遇雨或風浪過大船班停駛，直接切換回【方案 A 那霸慢活】或參觀 OkiMu 沖繩博物館・美術館。",
                    stops: [
                        {
                            id: 1,
                            time: "06:00",
                            name: "那霸嘉新酒店 (出發整裝)",
                            shortName: "嘉新出發 🏨",
                            category: "activity",
                            categoryLabel: "出發整裝",
                            desc: "06:00 市區晨跑（或多睡飽），07:30 飯店早餐，準備涉水涼鞋與防曬。08:30 搭計程車前往泊港（車程僅約 7 分鐘）。",
                            lat: 26.2162,
                            lng: 127.6872,
                            stay: "60分",
                            tips: "穿著輕便涉水涼鞋或快乾衣物，攜帶防曬用品",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Collective+Naha"
                        },
                        {
                            id: 2,
                            time: "09:00",
                            name: "泊港 (Tomarin)",
                            shortName: "泊港 ⛴️",
                            category: "transport",
                            categoryLabel: "碼頭搭船",
                            desc: "09:00 搭乘高速船 Marine Liner 直奔渡嘉敷島（僅 35 分鐘，09:35 抵達渡嘉敷港）。",
                            lat: 26.2255,
                            lng: 127.6833,
                            stay: "35分船程",
                            tips: "🔥 高速船極搶手，出發前 1-2 個月務必於渡嘉敷村官網預訂",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tomari+Port"
                        },
                        {
                            id: 3,
                            time: "09:35",
                            name: "渡嘉敷港",
                            shortName: "渡嘉敷港 ⚓",
                            category: "transport",
                            categoryLabel: "抵達小島",
                            desc: "09:35 抵達渡嘉敷港，搭乘島上接駁巴士/小巴前往阿波連海灘（車程約 10 分鐘）。",
                            lat: 26.1983,
                            lng: 127.3622,
                            stay: "15分",
                            tips: "出碼頭即有接駁巴士前往阿波連海灘，車資約 400 円",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tokashiki+Port"
                        },
                        {
                            id: 4,
                            time: "10:00",
                            name: "阿波連海灘 (Aharen Beach)",
                            shortName: "阿波連海灘 🌊",
                            category: "spot",
                            categoryLabel: "世界級海灘",
                            desc: "世界級「慶良間藍」玻璃海踏浪與浮潛，海灘旁特色小食堂品嚐在地島咖哩或沖繩炒麵午餐。",
                            lat: 26.1793,
                            lng: 127.3484,
                            stay: "240分",
                            tips: "海水透明度極高、珊瑚礁生態絕美；小食堂品嚐島咖哩",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aharen+Beach"
                        },
                        {
                            id: 5,
                            time: "14:00",
                            name: "阿波連展望台",
                            shortName: "展望台絕景 📸",
                            category: "spot",
                            categoryLabel: "景觀遠眺",
                            desc: "登上阿波連/久場島展望台俯瞰整座漸層海灣與群島，拍照絕景！15:30 搭接駁車回港，搭 16:00 高速船返航（16:40 返抵泊港）。",
                            lat: 26.1747,
                            lng: 127.3478,
                            stay: "60分",
                            tips: "務必於 15:30 前搭接駁車回港，16:00 高速船準時返航",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aharen+Observatory"
                        },
                        {
                            id: 6,
                            time: "18:30",
                            name: "琉球海鮮酒場 琉星",
                            shortName: "回那霸晚餐 🍻",
                            category: "food",
                            categoryLabel: "晚餐居酒屋",
                            desc: "泊港搭計程車回嘉新酒店舒服盥洗放鬆，步行至久茂地居酒屋享用豐盛海鮮與沖繩料理。",
                            lat: 26.2168,
                            lng: 127.6834,
                            stay: "90分",
                            tips: "跳島後回飯店洗熱水澡再吃晚餐超享受，現場入座即可",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=琉球海鮮酒場+琉星"
                        },
                        {
                            id: 7,
                            time: "20:30",
                            name: "那霸嘉新酒店 (返回休息)",
                            shortName: "返回嘉新 🏨",
                            category: "hotel",
                            categoryLabel: "夜宿飯店",
                            desc: "步行返回嘉新酒店 (Hotel Collective)，結束療癒放鬆的跳島之旅。",
                            lat: 26.2162,
                            lng: 127.6872,
                            stay: "過夜",
                            tips: "享受五星級客房，好好放鬆全身肌肉",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Collective+Naha"
                        }
                    ]
                }
            ]
        },
        {
            id: "day3",
            dayNum: 3,
            date: "10/1 (週四)",
            title: "市區取車 ✕ 美國村/萬座毛 ✕ 恩納水感海景",
            color: "#2dd4bf",
            hotel: "恩納水感酒店 (AQUASENSE Hotel & Resort)",
            googleMapsUrl: "https://www.google.com/maps/dir/Hotel+Collective+Naha/美榮橋站/北谷町美國村/萬座毛/AQUASENSE+Hotel+%26+Resort",
            rainPlan: "前往全沖繩最大室內購物商場【永旺夢樂城沖繩來客夢 (AEON MALL Okinawa Rycom)】，內有超大室內水族箱與生活選物店，自駕室內停車完全不淋雨。",
            stops: [
                {
                    id: 1,
                    time: "09:00",
                    name: "那霸嘉新酒店 (退房出發)",
                    shortName: "嘉新退房 🏨",
                    category: "hotel",
                    categoryLabel: "飯店退房",
                    desc: "09:00 辦理退房，步行前往市區營業所取車，正式開啟沖繩自駕之旅。",
                    lat: 26.2162,
                    lng: 127.6872,
                    stay: "30分",
                    tips: "退房前確認行李與隨身護照、駕照正本帶齊",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Collective+Naha"
                },
                {
                    id: 2,
                    time: "09:30",
                    name: "租車取車點 (美榮橋/縣廳前)",
                    shortName: "市區取車 🚗",
                    category: "transport",
                    categoryLabel: "取車出發",
                    desc: "Times / Orix 營業所辦理取車手續，出示台灣駕照＋日文譯本，檢查車況後沿國道 58 號北上。",
                    lat: 26.2198,
                    lng: 127.6855,
                    stay: "30分",
                    tips: "自駕必備：台灣駕照正本＋日文譯本正本，沿國道58北上",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=26.2198,127.6855"
                },
                {
                    id: 3,
                    time: "12:00",
                    name: "GORDIE'S 漢堡 (北谷美國村)",
                    shortName: "美國村 🎡",
                    category: "food",
                    categoryLabel: "午餐散步",
                    desc: "午餐鹹食推薦【GORDIE'S】炭火手打漢堡或蒸氣海鮮；甜點推薦【Seaside Cafe Hanon】海景舒芙蕾鬆餅，海濱散策拍照。",
                    lat: 26.3217,
                    lng: 127.7554,
                    stay: "120分",
                    tips: "海濱步道適合拍照散步，炭火手打漢堡香氣撲鼻",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=GORDIE'S+Okinawa"
                },
                {
                    id: 4,
                    time: "14:30",
                    name: "萬座毛海岬遊步道",
                    shortName: "萬座毛海岬 🌊",
                    category: "spot",
                    categoryLabel: "自然絕景",
                    desc: "下午戶外健走：隆起珊瑚礁上的象鼻岩與清澈透底的琉球群青斷崖，平坦步道約 30-40 分鐘，拍照極美。",
                    lat: 26.5049,
                    lng: 127.8505,
                    stay: "50分",
                    tips: "步道全平緩好走，戶外海風強勁請留意帽子遮陽",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Manzamo"
                },
                {
                    id: 5,
                    time: "15:30",
                    name: "恩納水感酒店 (AQUASENSE)",
                    shortName: "恩納水感 🏨",
                    category: "hotel",
                    categoryLabel: "奢華入住",
                    desc: "辦理入住海景度假村，開箱海景露台露天按摩浴缸；傍晚在 AQUA Terrance 露天水上平台賞夕陽放空。",
                    lat: 26.4475,
                    lng: 127.8136,
                    stay: "90分",
                    tips: "所有客房均配備海景大陽台與露天按摩浴缸",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=AQUASENSE+Hotel+Resort"
                },
                {
                    id: 6,
                    time: "18:30",
                    name: "琉球料理 海物語 本店",
                    shortName: "海物語料理 🎶",
                    category: "food",
                    categoryLabel: "特色晚餐",
                    desc: "晚餐：知名傳統琉球料理，有現場三線琴民謠演奏、近海刺身與海葡萄（備選飯店 Bon Fire 中式海鮮或阿古豬恩納豚屋）。",
                    lat: 26.4389,
                    lng: 127.8082,
                    stay: "90分",
                    tips: "建議提早訂位，三線琴演奏氣氛熱絡道地",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Umimonogatari+Onna"
                },
                {
                    id: 7,
                    time: "20:30",
                    name: "恩納水感酒店 (星空酒吧休息)",
                    shortName: "回水感酒店 🏨",
                    category: "hotel",
                    categoryLabel: "夜晚微醺",
                    desc: "【AQUA Terrance Pool Bar】池畔星空調酒或回房享受露天陽台微風與海浪聲，極度愜意浪漫。",
                    lat: 26.4475,
                    lng: 127.8136,
                    stay: "過夜",
                    tips: "享受私人陽台浴缸，伴隨海浪聲放鬆入眠",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=AQUASENSE+Hotel+Resort"
                }
            ]
        },
        {
            id: "day4",
            dayNum: 4,
            date: "10/2 (週五)",
            title: "海景晨跑 ✕ 美麗海水族館 ✕ 岸本食堂 ✕ 福木林道",
            color: "#fbbf24",
            hotel: "恩納水感酒店 (AQUASENSE Hotel & Resort)",
            googleMapsUrl: "https://www.google.com/maps/dir/AQUASENSE+Hotel+%26+Resort/沖繩美麗海水族館/岸本食堂/備瀨福木林道/島時間/AQUASENSE+Hotel+%26+Resort",
            rainPlan: "水族館本身為頂級室內景點不受雨天影響；午後若落雨可直接轉往【名護啤酒工廠 (Orion Happy Park)】參觀室內釀造產線與試飲生啤。",
            stops: [
                {
                    id: 1,
                    time: "06:30",
                    name: "恩納水感酒店 (出發/晨跑)",
                    shortName: "恩納水感出發 🏨",
                    category: "activity",
                    categoryLabel: "海景晨跑",
                    desc: "清晨水感酒店出發，沿國道 58 號海側人行道往北折返（5-8 km），跑後回酒店享用豐盛海景早餐。",
                    lat: 26.4475,
                    lng: 127.8136,
                    stay: "60分",
                    tips: "海側人行道寬敞平坦，伴隨晨光海景舒壓極了",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=AQUASENSE+Hotel+Resort"
                },
                {
                    id: 2,
                    time: "11:15",
                    name: "沖繩美麗海水族館",
                    shortName: "美麗海水族館 🐋",
                    category: "spot",
                    categoryLabel: "深藍奇景",
                    desc: "在「黑潮之海」超大壓克力水槽前靜看巨型鯨鯊與鬼蝠魟遨遊，感受深藍世界的極致靜謐與療癒。",
                    lat: 26.6943,
                    lng: 127.8779,
                    stay: "100分",
                    tips: "黑潮之海餵食秀壯觀，館內冷氣舒適好逛",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Okinawa+Churaumi+Aquarium"
                },
                {
                    id: 3,
                    time: "13:00",
                    name: "百年老店 岸本食堂",
                    shortName: "岸本食堂 🍜",
                    category: "food",
                    categoryLabel: "排隊名店",
                    desc: "午餐：古法柴火熬煮三層肉手打沖繩麵，本部町最代表性的排隊老店（備案：花人逢海景披薩）。",
                    lat: 26.6628,
                    lng: 127.8887,
                    stay: "60分",
                    tips: "柴火熬煮湯頭鮮甜回甘，厚切三層肉軟嫩入口即化",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kishimoto+Shokudo"
                },
                {
                    id: 4,
                    time: "14:30",
                    name: "備瀨福木林道",
                    shortName: "福木林道單車 🚴",
                    category: "activity",
                    categoryLabel: "林道騎行",
                    desc: "入口處租借腳踏車，穿梭在數千棵茂密福木樹蔭形成的綠色隧道中一路騎向海灘，極具日系文藝感！",
                    lat: 26.7042,
                    lng: 127.8814,
                    stay: "75分",
                    tips: "入口租腳踏車約 300-500 円/小時，微風穿林舒爽愜意",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bise+Fukugi+Tree+Road"
                },
                {
                    id: 5,
                    time: "18:30",
                    name: "島時間 (Shimajikan)",
                    shortName: "島時間晚餐 🥢",
                    category: "food",
                    categoryLabel: "在地家常",
                    desc: "晚餐：恩納村在地居酒食堂，品嚐沖繩苦瓜炒豆腐、自製炸魚餅與海苔茶漬飯，現場入座即可。",
                    lat: 26.5055,
                    lng: 127.8552,
                    stay: "80分",
                    tips: "溫馨家常料理，風味樸實道地，感受村落夜生活",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shimajikan+Onna"
                },
                {
                    id: 6,
                    time: "20:30",
                    name: "恩納水感酒店 (返回休息)",
                    shortName: "返回恩納水感 🏨",
                    category: "hotel",
                    categoryLabel: "夜宿飯店",
                    desc: "返回恩納水感酒店，在私人露天陽台享受按摩浴缸泡澡，吹著海風聽海浪聲入眠。",
                    lat: 26.4475,
                    lng: 127.8136,
                    stay: "過夜",
                    tips: "夜晚聽浪看星空，初秋海風舒適愜意",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=AQUASENSE+Hotel+Resort"
                }
            ]
        },
        {
            id: "day5",
            dayNum: 5,
            date: "10/3 (週六)",
            title: "外人住宅文青採買 ✕ 瀨長島機場歸途（上午二選一）",
            color: "#c084fc",
            hotel: "返台（滿載美好回憶）",
            plans: [
                {
                    id: "optA",
                    name: "選項 A：殘波岬海景",
                    title: "殘波岬海景散步 ✕ 港川文青採買 ✕ 瀨長島歸途",
                    badge: "30 公尺隆起海崖與白色燈塔大景",
                    color: "#c084fc",
                    googleMapsUrl: "https://www.google.com/maps/dir/AQUASENSE+Hotel+%26+Resort/殘波岬燈塔/港川外人住宅區/瀨長島/那霸機場",
                    rainPlan: "若下大雨，直接前往機場旁大型室內商場【iias 沖繩豐崎】，內有科技感 DMM Kariyushi 水族館與特產專賣店，完全室內採買後直接前往隔壁還車點。",
                    stops: [
                        {
                            id: 1,
                            time: "09:00",
                            name: "恩納水感酒店 (退房出發)",
                            shortName: "水感退房 🏨",
                            category: "hotel",
                            categoryLabel: "飯店退房",
                            desc: "悠閒享受陽台晨光後退房，啟程前往殘波岬（車程約 25 分鐘）。",
                            lat: 26.4475,
                            lng: 127.8136,
                            stay: "30分",
                            tips: "退房前確認行李與車內物品無遺漏",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=AQUASENSE+Hotel+Resort"
                        },
                        {
                            id: 2,
                            time: "09:40",
                            name: "殘波岬燈塔公園",
                            shortName: "殘波岬 🗼",
                            category: "spot",
                            categoryLabel: "海岬絕景",
                            desc: "登上 30 米高隆起海崖欣賞白色燈塔與洶湧浪濤拍打的壯闊大景，海風清爽宜人。",
                            lat: 26.4402,
                            lng: 127.7126,
                            stay: "50分",
                            tips: "海崖壯闊，拍照取景極佳，步道平緩好走",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cape+Zanpa+Lighthouse"
                        },
                        {
                            id: 3,
                            time: "10:40",
                            name: "港川外人住宅區 (oHacorté 港川店)",
                            shortName: "港川外人住宅 🏘️",
                            category: "shopping",
                            categoryLabel: "文青甜點",
                            desc: "舊美軍宿舍改建聚落，品嚐【oHacorté 港川本店】招牌水果塔，採買「旅するタルト砂餅」與「檸檬蛋糕」伴手禮。",
                            lat: 26.2625,
                            lng: 127.7153,
                            stay: "70分",
                            tips: "甜點精緻，一次買齊高品質沖繩伴手禮",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=oHacorte+Minatogawa"
                        },
                        {
                            id: 4,
                            time: "12:00",
                            name: "瀨長島 Umikaji Terrace",
                            shortName: "瀨長島 ✈️",
                            category: "spot",
                            categoryLabel: "海景起降",
                            desc: "白色地中海階梯聚落近距離欣賞飛機震撼起降，享用海景午餐並補齊沖繩海鹽與辣油等伴手禮。",
                            lat: 26.1751,
                            lng: 127.6433,
                            stay: "75分",
                            tips: "看飛機降落視角超近，伴手禮品項齊全",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Umikaji+Terrace+Senagajima"
                        },
                        {
                            id: 5,
                            time: "13:30",
                            name: "那霸機場租車營業所",
                            shortName: "還車 🚙",
                            category: "transport",
                            categoryLabel: "租車歸還",
                            desc: "抵達機場附近營業所還車，加滿油確認車況，搭乘免費接駁車前往航廈。",
                            lat: 26.1950,
                            lng: 127.6521,
                            stay: "30分",
                            tips: "還車前於附近加油站加滿油並保留收據",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=26.1950,127.6521"
                        },
                        {
                            id: 6,
                            time: "15:50",
                            name: "那霸機場 (OKA 返台)",
                            shortName: "機場起飛 ✈️",
                            category: "transport",
                            categoryLabel: "航班起飛",
                            desc: "預留 2 小時前抵達航廈辦理登機與托運，搭乘 15:50 航班起飛返台，滿載美好回憶！",
                            lat: 26.2064,
                            lng: 127.6459,
                            stay: "搭機返台",
                            tips: "國際線建議 13:50 抵達航廈報到",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Naha+Airport"
                        }
                    ]
                },
                {
                    id: "optB",
                    name: "選項 B：陶藝村散策",
                    title: "讀谷陶藝之村 ✕ 港川文青採買 ✕ 瀨長島歸途",
                    badge: "漫步紅瓦登窯與石板路工坊",
                    color: "#f472b6",
                    googleMapsUrl: "https://www.google.com/maps/dir/AQUASENSE+Hotel+%26+Resort/讀谷山燒陶藝之村/港川外人住宅區/瀨長島/那霸機場",
                    rainPlan: "若下大雨，直接前往機場旁大型室內商場【iias 沖繩豐崎】，內有科技感 DMM Kariyushi 水族館與特產專賣店，完全室內採買後直接前往隔壁還車點。",
                    stops: [
                        {
                            id: 1,
                            time: "09:00",
                            name: "恩納水感酒店 (退房出發)",
                            shortName: "水感退房 🏨",
                            category: "hotel",
                            categoryLabel: "飯店退房",
                            desc: "悠閒享受陽台晨光後辦理退房，啟程前往讀谷村陶藝聚落。",
                            lat: 26.4475,
                            lng: 127.8136,
                            stay: "30分",
                            tips: "退房前確認行李完整收妥",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=AQUASENSE+Hotel+Resort"
                        },
                        {
                            id: 2,
                            time: "09:30",
                            name: "讀谷山燒 陶藝之村",
                            shortName: "陶藝之村 🏺",
                            category: "spot",
                            categoryLabel: "工藝聚落",
                            desc: "在琉球紅瓦登窯與綠意石板路間探訪在地手作器皿與藝術選物，散發濃厚民藝氣息。",
                            lat: 26.4087,
                            lng: 127.7634,
                            stay: "60分",
                            tips: "工坊林立，可挑選精美沖繩手作陶器皿",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Yachimun+no+Sato"
                        },
                        {
                            id: 3,
                            time: "10:40",
                            name: "港川外人住宅區 (oHacorté 港川店)",
                            shortName: "港川外人住宅 🏘️",
                            category: "shopping",
                            categoryLabel: "文青甜點",
                            desc: "品嚐【oHacorté 港川本店】水果塔，採買砂餅與檸檬蛋糕等質感伴手禮。",
                            lat: 26.2625,
                            lng: 127.7153,
                            stay: "70分",
                            tips: "甜點美味，伴手禮包裝精緻適合送禮",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=oHacorte+Minatogawa"
                        },
                        {
                            id: 4,
                            time: "12:00",
                            name: "瀨長島 Umikaji Terrace",
                            shortName: "瀨長島 ✈️",
                            category: "spot",
                            categoryLabel: "海景起降",
                            desc: "白色地中海聚落看飛機起降、海鹽伴手禮最後補貨與海景午餐。",
                            lat: 26.1751,
                            lng: 127.6433,
                            stay: "75分",
                            tips: "階梯商街視野遼闊，欣賞飛機降落",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Umikaji+Terrace+Senagajima"
                        },
                        {
                            id: 5,
                            time: "13:30",
                            name: "那霸機場租車營業所",
                            shortName: "還車 🚙",
                            category: "transport",
                            categoryLabel: "租車歸還",
                            desc: "抵達機場附近營業所加滿油還車，搭接駁車前往航廈。",
                            lat: 26.1950,
                            lng: 127.6521,
                            stay: "30分",
                            tips: "預留充裕時間搭接駁車至航廈",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=26.1950,127.6521"
                        },
                        {
                            id: 6,
                            time: "15:50",
                            name: "那霸機場 (OKA 返台)",
                            shortName: "機場起飛 ✈️",
                            category: "transport",
                            categoryLabel: "航班起飛",
                            desc: "辦理登機後搭 15:50 航班起飛返台，結束完美的 5 天 4 夜秋日沖繩之旅！",
                            lat: 26.2064,
                            lng: 127.6459,
                            stay: "搭機返台",
                            tips: "依規定提早至登機門候機",
                            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Naha+Airport"
                        }
                    ]
                }
            ]
        }
    ],
    runnerRoutes: [
        {
            dayLabel: "Day 2 (9/30) 清晨 ｜ 5-6 km",
            title: "那霸市區路線（綠蔭橡膠跑道）",
            color: "#38bdf8",
            pace: "輕鬆跑 / Zone 2",
            route: "嘉新酒店出發 ➔ 經久茂地川 ➔ 奧武山公園繞圈 ➔ 返回酒店。",
            highlights: "奧武山公園內設有平整柔軟的專用橡膠慢跑跑道與綠蔭，清晨微涼舒適，回程可順路探訪波之上海灘。若選跳島方案可提早至 06:00 進行。"
        },
        {
            dayLabel: "Day 4 (10/2) 清晨 ｜ 5-8 km",
            title: "恩納海岸公路路線（極致海景跑）",
            color: "#2dd4bf",
            pace: "輕鬆跑 / 海景晨跑",
            route: "AQUASENSE 酒店出發 ➔ 切入 國道 58 號（海側人行道往北）折返。",
            highlights: "人行步道平整寬敞，左手邊即是透明度極高的清晨「沖繩藍」海景與浪花聲，初秋早晨跑起來極度舒壓。"
        }
    ],
    runnerAdvice: "沖繩初秋（9-10月）清晨氣溫約 24-26°C，海邊紫外線偏強，建議備妥薄款防曬帽、太陽眼鏡、導汗帶與運動心率手錶。",
    checklist: [
        {
            category: "🔥 預先準備",
            icon: "check-circle",
            items: [
                "機票",
                "飯店",
                "租車",
                "餐廳訂位",
                "旅平險 / 旅遊不便險",
                "機場停車 / 接駁預訂"
            ]
        },
        {
            category: "核心證件",
            icon: "shield-check",
            items: [
                "護照正本（效期 6 個月以上）",
                "台灣駕照正本",
                "台灣駕照日文譯本正本",
                "機票 / 登機證憑證",
                "Visit Japan Web (VJW) QR Code",
                "海外信用卡（2-3 張）",
                "日圓現金（約 3-5 萬円）"
            ]
        },
        {
            category: "自駕必備",
            icon: "car",
            items: [
                "租車預約確認單",
                "車充轉接頭 ＆ 充電線",
                "太陽眼鏡"
            ]
        },
        {
            category: "晨跑裝備",
            icon: "activity",
            items: [
                "路跑鞋",
                "運動跑服 / 跑褲（2-3 套）",
                "運動跑步襪",
                "運動心率手錶 ＆ 充電線",
                "遮陽跑帽 / 導汗帶"
            ]
        },
        {
            category: "3C 影音",
            icon: "smartphone",
            items: [
                "機上 / 隨身降噪耳機",
                "藍牙運動耳機",
                "相機 / 鏡頭 / 電池 / 記憶卡",
                "行動電源 ＆ 充電線（隨身登機）",
                "日本上網 eSIM",
                "多孔快充插頭 ＆ 線材"
            ]
        },
        {
            category: "休閒度假",
            icon: "palmtree",
            items: [
                "泳裝 / 泳褲",
                "防水袋 / 涉水涼鞋",
                "輕便薄外套 / 襯衫",
                "摺疊傘 / 輕便雨衣"
            ]
        },
        {
            category: "個人隨身",
            icon: "briefcase",
            items: [
                "個人常備藥品",
                "防曬 / 防蚊",
                "濕紙巾 / 衛生紙",
                "眼藥水 / 人工淚液",
                "個人盥洗備品（牙刷、牙膏、刮鬍刀）"
            ]
        }
    ]
};
