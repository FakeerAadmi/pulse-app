/* =========================================================
   SAFE DOM HELPERS — null-guard all getElementById accesses
   ========================================================= */
console.log("Pulse app.js loading...");
// el(id) returns the element or a no-op proxy so .style/.textContent never throws
function el(id) {
    const e = document.getElementById(id);
    if (e) return e;
    // Return a minimal proxy that silently absorbs property sets
    return new Proxy({}, { get: () => new Proxy(() => { }, { get: () => new Proxy(() => { }, { set: () => true }), set: () => true, apply: () => { } }), set: () => true });
}

/* =========================================================
   BRAND CATALOGUE
   ========================================================= */
const BRANDS_BY_COUNTRY = {
    IN: {
        cigarette: ['Gold Flake', 'Four Square', 'Wills Navy Cut', 'Classic Milds', 'Classic Regular', 'Classic Full', 'Marlboro Red', 'Marlboro Gold', 'Camel', 'Lucky Strike', 'Dunhill', 'Benson & Hedges', 'Bristol', 'Scissors', 'Panama'],
        cigar: ['Cohiba', 'Montecristo', 'Romeo y Julieta', 'Arturo Fuente', 'Partagas', 'Macanudo', 'Davidoff', 'Villiger', 'Café Crème', 'Henri Wintermans', 'Punch', 'Café Noir', 'Café Mild', 'Dannemann', 'Clubmaster'],
        cigarillo: ['Café Crème', 'Café Noir', 'Villiger', 'Henri Wintermans', 'Café Mild', 'Al Capone', 'Antonio y Cleopatra', 'Dannemann', 'Djarum', 'Clubmaster', 'Swisher Sweets', 'White Owl', 'Dutch Masters', 'Garcia y Vega', 'Backwoods'],
        pipe: ['Dunhill', 'Amphora', 'Captain Black', 'Mac Baren', 'Erinmore', 'Samuel Gawith', 'Peterson', 'Comoy', 'Davidoff', 'Stanwell', 'Prince Albert', 'Balkan Sobranie', 'Mixture 79', 'Borkum Riff', 'Clan'],
        vape_pod: ['Elf Bar', 'Geek Bar', 'Lost Mary', 'Vuse', 'Relx', 'IQS', 'Geekvape', 'Voopoo', 'Smok', 'Innokin', 'Uwell Caliburn', 'Aspire', 'Vaporesso', 'Freemax', 'Hyde'],
        vape_mod: ['Voopoo Drag', 'Geekvape Aegis', 'Smok Morph', 'Vaporesso Gen', 'Lost Vape Thelema', 'Innokin Coolfire', 'Aspire Skystar', 'Wismec Reuleaux', 'GeekVape Zeus', 'Freemax Maxus', 'Vandy Vape', 'Uwell Crown', 'Hellvape', 'Dovpo', 'Rincoe'],
        patch: ['Nicotinell', 'NiQuitin', 'Nicorette', 'Habitrol', 'Generic 7mg', 'Generic 14mg', 'Generic 21mg', 'Step 1 Clear', 'Nicotine TTS', 'Nicorite'],
        gum: ['Nicorette 2mg', 'Nicorette 4mg', 'Nicotinell 2mg', 'Nicotinell 4mg', 'Habitrol 2mg', 'Habitrol 4mg', 'NiQuitin 2mg', 'NiQuitin 4mg', 'Generic Mint', 'Generic Fruit'],
        pouch: ['Zyn 3mg', 'Zyn 6mg', 'On! 2mg', 'On! 4mg', 'Velo 4mg', 'Velo 10mg', 'Nordic Spirit', 'White Fox', 'Lyft', 'Loop'],
    },
    US: {
        cigarette: ['Marlboro Red', 'Marlboro Gold', 'Marlboro Menthol', 'Newport', 'Camel', 'Lucky Strike', 'Winston', 'Pall Mall', 'Kool', 'American Spirit', 'Parliament', 'Salem', 'L&M', 'Maverick', 'Basic'],
        cigar: ['Cohiba', 'Montecristo', 'Romeo y Julieta', 'Arturo Fuente', 'Padron', 'Rocky Patel', 'Macanudo', 'Punch', 'CAO', 'Oliva', 'My Father', 'Liga Privada', 'Perdomo', 'Alec Bradley', 'H. Upmann'],
        cigarillo: ['Swisher Sweets', 'White Owl', 'Dutch Masters', 'Backwoods', 'Garcia y Vega', 'Al Capone', 'Phillies', 'Black & Mild', 'Optimo', 'Game', 'Zig-Zag', 'Good Times', 'Villiger', 'Café Crème', 'Djarum'],
        pipe: ['Prince Albert', 'Captain Black', 'Dunhill', 'Amphora', 'Mac Baren', 'Erinmore', 'Samuel Gawith', 'Lane Limited', 'Cornell & Diehl', 'Sutliff', 'Frog Morton', 'Rattray\'s', 'Solani', 'Dunbar', 'Balkan Sobranie'],
        vape_pod: ['Juul', 'Vuse', 'Blu', 'Njoy', 'Logic', 'Lost Mary', 'Elf Bar', 'Geek Bar', 'Puff Bar', 'Fume', 'HQD', 'Breeze', 'Air Bar', 'Bang', 'Hyde'],
        vape_mod: ['Voopoo Drag', 'Geekvape Aegis', 'Smok Morph', 'Vaporesso Gen', 'Lost Vape Thelema', 'Innokin Coolfire', 'Aspire Skystar', 'Wismec Reuleaux', 'GeekVape Zeus', 'Freemax Maxus', 'Vandy Vape', 'Uwell Crown', 'Hellvape', 'Dovpo', 'Rincoe'],
        patch: ['Nicoderm CQ', 'Nicorette', 'Habitrol', 'Generic 7mg', 'Generic 14mg', 'Generic 21mg', 'Step 1 Clear', 'Nicotine TTS', 'NiQuitin', 'Nicotinell'],
        gum: ['Nicorette 2mg', 'Nicorette 4mg', 'Nicotine Polacrilex 2mg', 'Nicotine Polacrilex 4mg', 'Habitrol 2mg', 'Habitrol 4mg', 'NiQuitin 2mg', 'NiQuitin 4mg', 'Generic Mint', 'Generic Fruit'],
        pouch: ['Zyn 3mg', 'Zyn 6mg', 'Zyn 9mg', 'On! 2mg', 'On! 4mg', 'Velo 4mg', 'Velo 10mg', 'Lucy', 'Rogue 3mg', 'Rogue 6mg', 'Dryft', 'Loop', 'Nordic Spirit', 'White Fox', 'Lyft'],
    },
    GB: {
        cigarette: ['Benson & Hedges', 'Marlboro Red', 'Marlboro Gold', 'Lambert & Butler', 'Richmond', 'Mayfair', 'Silk Cut', 'Rothmans', 'Camel', 'Lucky Strike', 'Dunhill', 'Embassy', 'John Player Special', 'Sterling', 'Winston'],
        cigar: ['Café Crème', 'Henri Wintermans', 'Café Noir', 'Café Mild', 'Villiger', 'Davidoff', 'Cohiba', 'Montecristo', 'Hamlet', 'Castella', 'Romeo y Julieta', 'Punch', 'King Edward', 'Panatella', 'Dannemann'],
        cigarillo: ['Café Crème', 'Henri Wintermans', 'Villiger', 'Café Noir', 'Café Mild', 'Dannemann', 'Clubmaster', 'Al Capone', 'Antonio y Cleopatra', 'Garcia y Vega', 'Djarum', 'Swisher Sweets', 'White Owl', 'Backwoods', 'Dutch Masters'],
        pipe: ['Dunhill', 'Amphora', 'Mac Baren', 'Erinmore', 'Samuel Gawith', 'Peterson', 'Comoy', 'Davidoff', 'Stanwell', 'Prince Albert', 'Balkan Sobranie', 'Mixture 79', 'Borkum Riff', 'Condor', 'Clan'],
        vape_pod: ['Vuse', 'Lost Mary', 'Elf Bar', 'Geek Bar', 'Blu', 'Logic', 'Relx', 'Geekvape', 'Voopoo', 'Smok', 'Innokin', 'Uwell Caliburn', 'Aspire', 'Vaporesso', 'Freemax'],
        vape_mod: ['Voopoo Drag', 'Geekvape Aegis', 'Smok Morph', 'Vaporesso Gen', 'Lost Vape Thelema', 'Innokin Coolfire', 'Aspire Skystar', 'Wismec Reuleaux', 'GeekVape Zeus', 'Freemax Maxus', 'Vandy Vape', 'Uwell Crown', 'Hellvape', 'Dovpo', 'Rincoe'],
        patch: ['Nicorette', 'Nicotinell', 'NiQuitin', 'Generic 7mg', 'Generic 14mg', 'Generic 21mg', 'Step 1 Clear', 'Nicotine TTS', 'Habitrol', 'Nicorite'],
        gum: ['Nicorette 2mg', 'Nicorette 4mg', 'Nicotinell 2mg', 'Nicotinell 4mg', 'NiQuitin 2mg', 'NiQuitin 4mg', 'Habitrol 2mg', 'Habitrol 4mg', 'Generic Mint', 'Generic Fruit'],
        pouch: ['Zyn 3mg', 'Zyn 6mg', 'Velo 4mg', 'Velo 10mg', 'Nordic Spirit', 'White Fox', 'Lyft', 'Loop', 'On! 2mg', 'On! 4mg'],
    },
    DEFAULT: {
        cigarette: ['Marlboro Red', 'Marlboro Gold', 'Camel', 'Lucky Strike', 'Dunhill', 'Benson & Hedges', 'Parliament', 'Newport', 'Winston', 'L&M', 'Philip Morris', 'Rothmans', 'Pall Mall', 'Kool', 'Salem'],
        cigar: ['Cohiba', 'Montecristo', 'Romeo y Julieta', 'Arturo Fuente', 'Partagas', 'Davidoff', 'Macanudo', 'Padron', 'Rocky Patel', 'Villiger', 'Café Crème', 'Henri Wintermans', 'Punch', 'Café Noir', 'Café Mild'],
        cigarillo: ['Café Crème', 'Café Noir', 'Villiger', 'Henri Wintermans', 'Swisher Sweets', 'White Owl', 'Dutch Masters', 'Backwoods', 'Djarum', 'Clubmaster', 'Al Capone', 'Dannemann', 'Garcia y Vega', 'Backwoods', 'Optimo'],
        pipe: ['Dunhill', 'Amphora', 'Captain Black', 'Mac Baren', 'Erinmore', 'Peterson', 'Davidoff', 'Prince Albert', 'Stanwell', 'Borkum Riff', 'Samuel Gawith', 'Comoy', 'Balkan Sobranie', 'Mixture 79', 'Clan'],
        vape_pod: ['Lost Mary', 'Elf Bar', 'Geek Bar', 'Vuse', 'Juul', 'Relx', 'Geekvape', 'Voopoo', 'Smok', 'Innokin', 'Uwell Caliburn', 'Aspire', 'Vaporesso', 'Freemax', 'Hyde'],
        vape_mod: ['Voopoo Drag', 'Geekvape Aegis', 'Smok Morph', 'Vaporesso Gen', 'Lost Vape Thelema', 'Innokin Coolfire', 'Aspire Skystar', 'GeekVape Zeus', 'Freemax Maxus', 'Uwell Crown', 'Wismec Reuleaux', 'Hellvape', 'Dovpo', 'Rincoe', 'Vandy Vape'],
        patch: ['Nicorette', 'Nicotinell', 'NiQuitin', 'Habitrol', 'Nicoderm CQ', 'Generic 7mg', 'Generic 14mg', 'Generic 21mg', 'Step 1 Clear', 'Nicotine TTS'],
        gum: ['Nicorette 2mg', 'Nicorette 4mg', 'Nicotinell 2mg', 'Nicotinell 4mg', 'NiQuitin 2mg', 'NiQuitin 4mg', 'Generic Mint', 'Generic Fruit', 'Habitrol 2mg', 'Habitrol 4mg'],
        pouch: ['Zyn 3mg', 'Zyn 6mg', 'Zyn 9mg', 'On! 2mg', 'On! 4mg', 'Velo 4mg', 'Velo 10mg', 'Nordic Spirit', 'White Fox', 'Lyft', 'Loop', 'Lucy', 'Rogue 3mg', 'Rogue 6mg', 'Dryft'],
    }
};

let BRANDS = JSON.parse(JSON.stringify(BRANDS_BY_COUNTRY.IN));
let currentCountry = 'IN';

/* =========================================================
   PRODUCT CATALOGUE
   ========================================================= */
const ICONS = {
    cigarette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 14h14v3H2z"/><path d="M18 14h4v3h-4z"/><path d="M16 14v3"/><path d="M20 9c0-2-2-3-2-5"/><path d="M17 9c0-1.5-1.5-2.25-1.5-3.75"/></svg>`,
    cigar: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="10" width="16" height="4" rx="2" fill="currentColor" opacity=".15" stroke="currentColor" stroke-width="1.6"/><rect x="2" y="10.8" width="14" height="2.4" rx="1.2" fill="currentColor"/><path d="M18 12h1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20.5 10.5c.8-.5 1.2-1.2 1-2-.3-1-1.2-1.5-1-2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M19 10.5c.6-.4.9-.9.7-1.5-.2-.8-.9-1.1-.7-1.9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    cigarillo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 13h12"/><path d="M14 13l3 1-3 1"/><path d="M16 10c.8.8.8 2.4 0 3.2"/></svg>`,
    pipe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 16h10"/><path d="M12 16c0 2 2 3 4 3s4-1 4-3v-4h-8v4z"/><path d="M16 12V8a2 2 0 00-4 0"/></svg>`,
    vape_pod: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="8" y="4" width="8" height="14" rx="3"/><path d="M11 8h2"/><path d="M6 11c-2 1-3 3-2 5"/></svg>`,
    vape_mod: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="4" width="10" height="16" rx="2"/><path d="M9 8h6"/><path d="M9 11h6"/><circle cx="11" cy="15" r="1" fill="currentColor"/></svg>`,
    patch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="7" width="18" height="10" rx="3"/><line x1="9" y1="7" x2="9" y2="17"/><line x1="15" y1="7" x2="15" y2="17"/><line x1="3" y1="12" x2="21" y2="12"/></svg>`,
    gum: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="6" width="16" height="12" rx="3"/><path d="M8 6V4"/><path d="M16 6V4"/><line x1="4" y1="12" x2="20" y2="12"/></svg>`,
    pouch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8c0-2 1-4 7-4s7 2 7 4v8c0 2-1 4-7 4s-7-2-7-4V8z"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
};

// Flat, solid-colored SVG icons for moods
const MOOD_ICONS = [
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5s1 1.5 3.5 1.5 3.5-1.5 3.5-1.5"/><line x1="9" y1="10" x2="9" y2="10.01" stroke-width="2"/><line x1="15" y1="10" x2="15" y2="10.01" stroke-width="2"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line x1="8.5" y1="15" x2="15.5" y2="15"/><line x1="9" y1="10" x2="9" y2="10.01" stroke-width="2"/><line x1="15" y1="10" x2="15" y2="10.01" stroke-width="2"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 15.5s1-1.5 3.5-1.5 3.5 1.5 3.5 1.5"/><path d="M8.5 9.5c.5-.5 1.5-.5 2 0M13.5 9.5c.5-.5 1.5-.5 2 0"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 15.5s1-1.5 3.5-1.5 3.5 1.5 3.5 1.5"/><line x1="8.5" y1="9.5" x2="10.5" y2="10.5" stroke-width="1.5"/><line x1="15.5" y1="9.5" x2="13.5" y2="10.5" stroke-width="1.5"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line x1="8.5" y1="14.5" x2="15.5" y2="14.5"/><path d="M9 10.5c0-.5.5-1 1-1M14 10.5c0-.5.5-1 1-1"/><line x1="12" y1="6" x2="12" y2="8" stroke-width="1.5"/></svg>`,
];

const P = {
    cigarette: { label: 'Cigarette', icon: ICONS.cigarette, short: 'Cig', strengths: [{ l: 'Light', mg: .6 }, { l: 'Regular', mg: 1.2 }, { l: 'Strong', mg: 1.8 }], def: 1, combustible: true },
    cigar: { label: 'Cigar', icon: ICONS.cigar, short: 'Cigar', strengths: [{ l: 'Mild', mg: 3 }, { l: 'Medium', mg: 7 }, { l: 'Full', mg: 15 }], def: 0, combustible: true },
    cigarillo: { label: 'Cigarillo', icon: ICONS.cigarillo, short: 'Cigaro', strengths: [{ l: 'Mild', mg: 1 }, { l: 'Regular', mg: 2 }, { l: 'Strong', mg: 4 }], def: 1, combustible: true },
    pipe: { label: 'Pipe', icon: ICONS.pipe, short: 'Pipe', strengths: [{ l: 'Light', mg: 1 }, { l: 'Regular', mg: 3 }, { l: 'Rich', mg: 6 }], def: 1, combustible: true },
    vape_pod: { label: 'Vape (Pod)', icon: ICONS.vape_pod, short: 'Pod', strengths: [{ l: '3mg', mg: .5 }, { l: '6mg', mg: .8 }, { l: '10mg', mg: 1 }, { l: '20mg Salt', mg: 1.5 }], def: 1 },
    vape_mod: { label: 'Vape (Mod)', icon: ICONS.vape_mod, short: 'Mod', strengths: [{ l: '3mg', mg: .4 }, { l: '6mg', mg: .7 }, { l: '12mg', mg: 1 }, { l: '18mg', mg: 1.4 }], def: 1 },
    patch: { label: 'Patch', icon: ICONS.patch, short: 'Patch', strengths: [{ l: '7mg/d', mg: .3 }, { l: '14mg/d', mg: .6 }, { l: '21mg/d', mg: 1 }], def: 2 },
    gum: { label: 'Gum', icon: ICONS.gum, short: 'Gum', strengths: [{ l: '2mg', mg: 1.5 }, { l: '4mg', mg: 3 }], def: 0 },
    pouch: { label: 'Pouch', icon: ICONS.pouch, short: 'Pouch', strengths: [{ l: '4mg', mg: 3 }, { l: '8mg', mg: 6 }, { l: '12mg', mg: 9 }, { l: '16mg', mg: 12 }], def: 0 },
};

const TRIGGERS = ['Stress', 'Routine', 'Social', 'Boredom', 'Automatic', 'Other'];
const MOODS = [
    { e: MOOD_ICONS[0], l: 'Calm' },
    { e: MOOD_ICONS[1], l: 'Neutral' },
    { e: MOOD_ICONS[2], l: 'Stressed' },
    { e: MOOD_ICONS[3], l: 'Frustrated' },
    { e: MOOD_ICONS[4], l: 'Tired' }
];

/* =========================================================
   APP STATE
   ========================================================= */
const state = {
    pulseMode: 'focused',   // 'focused' | 'full'
    onboarded: false,
    userProfile: { age: 28, sex: 'M', weight: 70, yearsSmoked: 3, primaryProduct: 'cigarette', dailyFreq: '3-5', cycleLength: 28, lastPeriod: null },
    biometrics: {
        hrv: null, rhr: null, spo2: null, stress: null,
        steps: null, respiratoryRate: null,
        sleepScore: null, sleepEnd: null,
        simulated: true,
        lastUpdated: null,
    },
    intakes: [],
    defaultProd: 'cigarette',
    prodStrengths: Object.fromEntries(Object.entries(P).map(([k, v]) => [k, v.def])),
    logSel: { product: 'cigarette', strength: 1, trigger: null, mood: null, brand: null },
    qlProd: 'cigarette',
    qlSlots: ['cigarette', 'vape_pod', 'gum', 'pouch'],
    craveInterval: null,
    sinePhase: 0,
    graphRange: '4h',
    histOffset: 0,
    darkMode: false,
    dailyBudget: 5,
    enabledBrands: Object.fromEntries(Object.keys(BRANDS).map(k => [k, new Set(BRANDS[k])])),
    userCountry: 'IN',
    milestones: {
        '20m': { label: '20 minutes', sub: 'Blood pressure and pulse rate drop to normal. Circulation improves.', shown: false },
        '12h': { label: '12 hours', sub: 'Carbon monoxide levels in blood return to normal.', shown: false },
        '72h': { label: '72 hours', sub: 'Nicotine is fully eliminated. Sense of smell and taste begin to return.', shown: false },
    },
    tourSeen: false,
    plannedGap: null,
    plannedGapMins: null,
    mode: 'Understand patterns',
    reflection: {
        lastPromptDate: null,
        answers: [],
    },
    weeklySummary: {
        lastGenDate: null,
        text: '',
    },
};

/* =========================================================
   PHARMACOKINETICS
   ========================================================= */
let HALF_LIFE_MS = 120 * 60 * 1000;
let K = Math.LN2 / HALF_LIFE_MS;
const CO_HALF_LIFE_MS = 5 * 60 * 60 * 1000;
const K_CO = Math.LN2 / CO_HALF_LIFE_MS;
let SAT_MAX = 3.6;
const WIN_MS = 4 * 60 * 60 * 1000;

function updateMetabolism() {
    const p = state.userProfile;
    let baseHL = 120;
    if (p.sex === 'F') baseHL *= 0.72;
    else if (p.sex === 'O') baseHL *= 0.88;
    if (p.age > 60) baseHL *= 1.20;
    else if (p.age < 25) baseHL *= 0.90;
    if (p.weight < 55) baseHL *= 0.88;
    else if (p.weight > 95) baseHL *= 1.12;
    HALF_LIFE_MS = baseHL * 60 * 1000;
    K = Math.LN2 / HALF_LIFE_MS;
    SAT_MAX = 3.6 + Math.min(p.yearsSmoked || 0, 20) * 0.18;
}

function satAt(t, logs) {
    return logs.reduce((s, i) => {
        const e = t - i.time;
        return e < 0 ? s : s + i.mg * Math.exp(-K * e);
    }, 0);
}

function getGraphWindow(rangeMs) {
    const now = Date.now();
    const relevant = state.intakes.filter(i => i.time >= now - rangeMs - 30 * 60000);
    if (relevant.length === 0) {
        return { winStart: now - rangeMs * 0.72, winEnd: now + rangeMs * 0.28 };
    }
    const firstT = Math.min(...relevant.map(i => i.time));
    const currentSat = satAt(now, state.intakes);
    const msToBaseline = currentSat > 0.04 ? Math.log(currentSat / 0.04) / K : 0;
    const baselineT = now + msToBaseline;
    const padBefore = 12 * 60000;
    const padAfter = Math.max(18 * 60000, msToBaseline * 0.12);
    let winStart = Math.min(firstT - padBefore, now - 5 * 60000);
    let winEnd = Math.max(baselineT + padAfter, now + 10 * 60000);
    const span = winEnd - winStart;
    const minSpan = 40 * 60000;
    if (span < minSpan) {
        const mid = (winStart + winEnd) / 2;
        winStart = mid - minSpan / 2;
        winEnd = mid + minSpan / 2;
    }
    return { winStart, winEnd };
}

function getStrictWindow(rangeMs) {
    const now = Date.now();
    const currentSat = satAt(now, state.intakes);
    const msToBaseline = currentSat > 0.04 ? Math.log(currentSat / 0.04) / K : 0;
    const futurePad = Math.min(msToBaseline * 0.15, rangeMs * 0.12, 20 * 60000);
    return {
        winStart: now - rangeMs,
        winEnd: now + Math.max(futurePad, 5 * 60000)
    };
}

/* =========================================================
   ONBOARDING
   ========================================================= */
function nextOnboarding(stepId) {
    console.log("nextOnboarding called with:", stepId);
    const current = document.querySelector('.onboarding-overlay.show');
    const next = document.getElementById(stepId);
    if (!next) {
        console.error("Next overlay not found:", stepId);
        return;
    }
    if (current) {
        current.classList.remove('show');
    }
    setTimeout(() => {
        next.classList.add('show');
    }, 50);
}
window.nextOnboarding = nextOnboarding;

function finishOnboarding() {
    state.userProfile.age = parseInt(document.getElementById('pfAge').value) || 28;
    state.userProfile.sex = _pfSex || 'M';
    state.userProfile.weight = parseInt(document.getElementById('pfWeight').value) || 70;
    state.userProfile.yearsSmoked = parseInt(document.getElementById('pfYears').value) || 0;
    state.userProfile.primaryProduct = _pfPrimaryProduct || 'cigarette';
    state.userProfile.dailyFreq = _pfDailyFreq || '3-5';
    state.qlProd = state.userProfile.primaryProduct;
    if (_pfSex === 'F') {
        state.userProfile.cycleLength = parseInt(document.getElementById('pfCycleLen').value) || 28;
    }
    state.onboarded = true;

    const shell = document.getElementById('onbShell');
    if (shell) shell.classList.add('done');

    tick();
    applyMode();

    setTimeout(() => { if (!state.tourSeen) openTour(); }, 500);
}
window.finishOnboarding = finishOnboarding;

/* =========================================================
   DARK MODE
   ========================================================= */
function toggleDark() {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle('dark', state.darkMode);
    document.getElementById('darkToggle').checked = state.darkMode;
    el('graphOverlay').style.background = state.darkMode ? 'var(--dark-bg)' : 'var(--bg)';
}

function toggleAmoled() {
    state.amoledMode = !state.amoledMode;
    document.body.classList.toggle('amoled', state.amoledMode);
    document.getElementById('amoledToggle').checked = state.amoledMode;
    if (state.amoledMode && !state.darkMode) {
        toggleDark();
    }
}

/* =========================================================
   HOME GRAPH — Canvas
   ========================================================= */
function drawGraph() {
    const canvas = document.getElementById('homeGraph');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rW = canvas.offsetWidth, rH = canvas.offsetHeight;
    if (canvas.width !== rW * dpr) { canvas.width = rW * dpr; canvas.height = rH * dpr; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save(); ctx.scale(dpr, dpr);

    const now = Date.now();
    const hasLogs = state.intakes.length > 0;
    const isDark = state.darkMode;
    const gridAlpha = isDark ? .1 : .05;
    const baselineAlpha = isDark ? .32 : .22;
    const inkBase = isDark ? '240,237,232' : '26,23,20';

    const { winStart, winEnd } = getGraphWindow(WIN_MS);
    const winTotal = winEnd - winStart;
    const tx = t => ((t - winStart) / winTotal) * rW;
    const nowX = Math.max(4, Math.min(rW - 4, tx(now)));

    ctx.strokeStyle = `rgba(${inkBase},${gridAlpha})`; ctx.lineWidth = .5;
    for (let i = 1; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(0, rH * i / 4); ctx.lineTo(rW, rH * i / 4); ctx.stroke();
    }

    ctx.beginPath(); ctx.moveTo(nowX, 0); ctx.lineTo(nowX, rH);
    ctx.strokeStyle = `rgba(${inkBase},.1)`; ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]); ctx.stroke(); ctx.setLineDash([]);

    if (!hasLogs) {
        state.sinePhase += 0.0003;
        const pts = [];
        for (let x = 0; x <= rW; x++) {
            const tN = x / rW;
            const slow = Math.sin(tN * Math.PI * 2.8 + state.sinePhase) * 0.09;
            const fast = Math.sin(tN * Math.PI * 7.2 + state.sinePhase * 2.1) * 0.028;
            pts.push({ x, y: rH * 0.62 + (slow + fast) * rH });
        }
        ctx.beginPath();
        pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.lineTo(rW, rH); ctx.lineTo(0, rH); ctx.closePath();
        ctx.fillStyle = `rgba(${inkBase},.05)`; ctx.fill();
        ctx.beginPath();
        pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = `rgba(${inkBase},${baselineAlpha})`; ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 7]); ctx.stroke(); ctx.setLineDash([]);
        const midY = pts[Math.floor(rW / 2)]?.y ?? rH * .62;
        ctx.fillStyle = `rgba(${inkBase},${baselineAlpha})`;
        ctx.font = `8px 'JetBrains Mono',monospace`; ctx.textAlign = 'left';
        ctx.fillText('natural baseline — log an intake to update', 8, midY - 10);
    } else {
        let maxSat = .05;
        for (let xi = 0; xi <= 160; xi++) {
            const t = winStart + (xi / 160) * winTotal;
            maxSat = Math.max(maxSat, satAt(t, state.intakes));
        }
        const yMax = Math.max(maxSat * 1.18, SAT_MAX * .08);
        const yP = (s) => rH - Math.min(s / yMax, 1) * (rH - 14) - 8;

        ctx.beginPath();
        for (let x = 0; x <= rW; x++) {
            const tN = x / rW;
            const wave = Math.sin(tN * Math.PI * 2.8 + state.sinePhase) * .03;
            const y = rH * .88 + wave * rH;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${inkBase},.09)`; ctx.lineWidth = .8;
        ctx.setLineDash([2, 5]); ctx.stroke(); ctx.setLineDash([]);

        const pastPts = [];
        for (let xi = 0; xi <= Math.round(nowX); xi++) {
            const t = winStart + (xi / rW) * winTotal;
            pastPts.push({ x: xi, y: yP(satAt(t, state.intakes)) });
        }

        const futurePts = [];
        for (let xi = Math.round(nowX); xi <= rW; xi++) {
            const t = winStart + (xi / rW) * winTotal;
            futurePts.push({ x: xi, y: yP(satAt(t, state.intakes)) });
        }

        ctx.fillStyle = `rgba(${inkBase},.36)`;
        ctx.font = `7px 'JetBrains Mono',monospace`; ctx.textAlign = 'left';
        [0, 0.25, 0.5, 0.75, 1.0].forEach(frac => {
            ctx.fillText((yMax * frac).toFixed(1) + 'mg', 2, yP(yMax * frac) - 2);
        });

        ctx.fillStyle = `rgba(${inkBase},.36)`;
        ctx.font = `7px 'JetBrains Mono',monospace`; ctx.textAlign = 'center';
        for (let i = 0; i <= 4; i++) {
            const t = winStart + (i / 4) * winTotal;
            const x = (i / 4) * rW;
            const isNow = Math.abs(t - now) < winTotal * 0.05;
            const d = new Date(t);
            const label = isNow ? 'now'
                : d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
            ctx.fillStyle = isNow ? `rgba(${inkBase},.6)` : `rgba(${inkBase},.32)`;
            if (x > 8 && x < rW - 8) ctx.fillText(label, x, rH - 2);
        }
        if (nowX > 12 && nowX < rW - 12) {
            ctx.fillStyle = `rgba(${inkBase},.6)`;
            ctx.fillText('now', nowX, rH - 2);
        }
        ctx.textAlign = 'left';

        const grad = ctx.createLinearGradient(0, 0, 0, rH);
        grad.addColorStop(0, 'rgba(74,124,111,.22)');
        grad.addColorStop(1, 'rgba(74,124,111,.01)');
        ctx.beginPath();
        pastPts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.lineTo(nowX, rH); ctx.lineTo(0, rH); ctx.closePath();
        ctx.fillStyle = grad; ctx.fill();

        const gradFuture = ctx.createLinearGradient(0, 0, 0, rH);
        gradFuture.addColorStop(0, 'rgba(74,124,111,.09)');
        gradFuture.addColorStop(1, 'rgba(74,124,111,.00)');
        ctx.beginPath();
        futurePts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.lineTo(rW, rH); ctx.lineTo(nowX, rH); ctx.closePath();
        ctx.fillStyle = gradFuture; ctx.fill();

        ctx.beginPath();
        pastPts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = 'rgba(74,124,111,.92)'; ctx.lineWidth = 2; ctx.stroke();

        ctx.beginPath();
        futurePts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = 'rgba(74,124,111,.55)'; ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 5]); ctx.stroke(); ctx.setLineDash([]);

        const currentSat = satAt(now, state.intakes);
        if (currentSat > 0.05) {
            const msToBaseline = Math.log(currentSat / 0.05) / K;
            const baselineX = tx(now + msToBaseline);
            const projColor = isDark ? 'rgba(90,156,143,.55)' : 'rgba(74,124,111,.45)';
            if (baselineX > nowX && baselineX < rW + 40) {
                const clampedX = Math.min(baselineX, rW - 2);
                ctx.beginPath(); ctx.moveTo(clampedX, rH - 12); ctx.lineTo(clampedX, rH - 4);
                ctx.strokeStyle = projColor; ctx.lineWidth = 1.5;
                ctx.setLineDash([]); ctx.stroke();
                const hrs = msToBaseline / 3600000;
                const label = hrs < 1 ? Math.round(msToBaseline / 60000) + 'm' : hrs.toFixed(1) + 'h';
                ctx.fillStyle = projColor;
                ctx.font = `6.5px 'JetBrains Mono',monospace`; ctx.textAlign = 'center';
                ctx.fillText(label + ' left', clampedX, rH - 14);
                ctx.textAlign = 'left';
            }
        }

        if (state.plannedGap && state.plannedGap > now) {
            const pgX = tx(state.plannedGap);
            if (pgX > nowX && pgX < rW) {
                ctx.beginPath(); ctx.moveTo(pgX, 4); ctx.lineTo(pgX, rH - 16);
                ctx.strokeStyle = 'rgba(154,106,42,.65)'; ctx.lineWidth = 1.5;
                ctx.setLineDash([2, 3]); ctx.stroke(); ctx.setLineDash([]);
                const pgSat = satAt(state.plannedGap, state.intakes);
                const pgY = yP(pgSat);
                ctx.beginPath(); ctx.arc(pgX, pgY, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(154,106,42,.85)'; ctx.fill();
                ctx.fillStyle = 'rgba(154,106,42,.8)';
                ctx.font = `6px 'JetBrains Mono',monospace`; ctx.textAlign = 'center';
                ctx.fillText('planned', pgX, 12);
                ctx.textAlign = 'left';
            }
        }

        if (state.dailyBudget > 0) {
            const todayMg = state.intakes.filter(l => new Date(l.time).toDateString() === new Date().toDateString()).reduce((s, l) => s + l.mg, 0);
            const pct = Math.min(todayMg / state.dailyBudget, 1);
            const budgetY = yP(yMax * pct);
            ctx.beginPath(); ctx.moveTo(0, budgetY); ctx.lineTo(nowX, budgetY);
            ctx.strokeStyle = 'rgba(154,106,42,.25)'; ctx.lineWidth = 1;
            ctx.setLineDash([3, 5]); ctx.stroke(); ctx.setLineDash([]);
        }

        state.intakes.forEach(log => {
            const lx = tx(log.time);
            if (lx < 4 || lx > nowX + 2) return;
            ctx.beginPath(); ctx.moveTo(lx, rH - 16); ctx.lineTo(lx, rH);
            ctx.strokeStyle = 'rgba(74,124,111,.12)'; ctx.lineWidth = 1;
            ctx.setLineDash([2, 4]); ctx.stroke(); ctx.setLineDash([]);
            const sSoon = satAt(log.time + 150, state.intakes.filter(l => l.time <= log.time + 150));
            const dotY = yP(sSoon);
            ctx.beginPath(); ctx.arc(lx, dotY, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(74,124,111,.9)'; ctx.fill();
            ctx.strokeStyle = isDark ? 'rgba(30,27,22,.6)' : 'rgba(255,255,255,.7)';
            ctx.lineWidth = 1.5; ctx.stroke();
            const t = new Date(log.time);
            const hr = t.getHours().toString().padStart(2, '0'), mn = t.getMinutes().toString().padStart(2, '0');
            ctx.fillStyle = 'rgba(74,124,111,.75)';
            ctx.font = `6px 'JetBrains Mono',monospace`; ctx.textAlign = 'center';
            ctx.fillText(`${hr}:${mn}`, lx, dotY - 7);
        });
    }

    ctx.restore();

    const sat = satAt(now, state.intakes);
    const satPct = Math.min(sat / SAT_MAX * 100, 100);
    document.getElementById('satBadge').textContent = satPct.toFixed(0) + '%';
}

/* =========================================================
   EXPANDED GRAPH OVERLAY
   ========================================================= */
function openGraphOverlay() {
    const ov = document.getElementById('graphOverlay');
    ov.classList.add('show');
    requestAnimationFrame(() => requestAnimationFrame(() => {
        renderExpandedGraph();
        renderOvHistory();
        initExpandedGraphScrub();
    }));
}

function closeGraphOverlay() {
    document.getElementById('graphOverlay').classList.remove('show');
}

function setRange(r, btn) {
    state.graphRange = r;
    document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('act'));
    btn.classList.add('act');
    const labels = { '4h': '4-hour window', '12h': '12-hour window', '24h': '24-hour window', '7d': '7-day view', '30d': '30-day view' };
    document.getElementById('govSubTitle').textContent = labels[r];
    renderExpandedGraph();
    renderOvHistory();
}

function renderExpandedGraph() {
    const canvas = document.getElementById('expandedGraph');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const wrap = canvas.parentElement;
    const overlayEl = document.getElementById('graphOverlay');

    const viewW = overlayEl ? overlayEl.clientWidth : (wrap.clientWidth || 380);
    const rH = Math.round(viewW * 0.58);
    const now = Date.now();
    const rangeMs = { '4h': 4, '12h': 12, '24h': 24, '7d': 168, '30d': 720 }[state.graphRange] * 3600000;
    const isMultiDay = state.graphRange === '7d' || state.graphRange === '30d';
    const isDark = document.body.classList.contains('dark');
    const inkRGB = isDark ? '240,237,232' : '26,23,20';
    const padL = 44, padR = 18, padT = 22, padB = 32;
    const gridLines = 5;

    if (isMultiDay) {
        const rW = viewW;
        canvas.style.width = rW + 'px'; canvas.style.height = rH + 'px';
        if (canvas.width !== Math.round(rW * dpr)) { canvas.width = Math.round(rW * dpr); canvas.height = Math.round(rH * dpr); }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, rW, rH);
        const W = rW - padL - padR, H = rH - padT - padB;
        for (let i = 0; i <= gridLines; i++) {
            const y = padT + (i / gridLines) * H;
            ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + W, y);
            ctx.strokeStyle = `rgba(${inkRGB},.06)`; ctx.lineWidth = .8; ctx.stroke();
        }
        const days = Math.round(rangeMs / 86400000);
        const dayData = [];
        let maxVal = .1;
        for (let d = days - 1; d >= 0; d--) {
            const ds = new Date(); ds.setHours(0, 0, 0, 0); ds.setDate(ds.getDate() - d);
            const de = new Date(ds); de.setDate(de.getDate() + 1);
            const logs = state.intakes.filter(l => l.time >= ds && l.time < de);
            const mg = logs.reduce((s, l) => s + l.mg, 0);
            const demo = [4.8, 3.2, 5.1, 4.4, 6.0, 3.8, 2.9, 4.1, 5.5, 3.3, 4.7, 6.2, 2.8, 3.9, 4.5][d % 15] ?? 0;
            const val = d === 0 ? mg : (mg > 0 ? mg : demo);
            maxVal = Math.max(maxVal, val);
            dayData.push({ val, label: ds.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), isToday: d === 0 });
        }
        dayData.reverse();
        const bw = W / dayData.length - 4;
        dayData.forEach((day, i) => {
            const x = padL + i * (W / dayData.length) + 2;
            const bh = Math.max(2, (day.val / maxVal) * H);
            const y = padT + H - bh;
            ctx.fillStyle = day.isToday ? 'rgba(74,124,111,.9)' : `rgba(${inkRGB},.12)`;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(x, y, bw, bh, 3); else ctx.rect(x, y, bw, bh);
            ctx.fill();
            ctx.fillStyle = day.isToday ? 'var(--sage)' : `rgba(${inkRGB},.35)`;
            ctx.font = `7px 'JetBrains Mono',monospace`; ctx.textAlign = 'center';
            ctx.fillText(day.label, x + bw / 2, padT + H + 18);
            if (day.val > 0) {
                ctx.fillStyle = `rgba(${inkRGB},.5)`;
                ctx.fillText(day.val.toFixed(1), x + bw / 2, y - 3);
            }
        });
        for (let i = 0; i <= gridLines; i++) {
            const y = padT + (i / gridLines) * H;
            ctx.fillStyle = `rgba(${inkRGB},.3)`; ctx.font = `8px 'JetBrains Mono',monospace`; ctx.textAlign = 'right';
            ctx.fillText((maxVal * (gridLines - i) / gridLines).toFixed(1) + 'mg', padL - 3, y + 3);
        }

    } else {
        const { winStart, winEnd } = getStrictWindow(rangeMs);
        const winSpan = winEnd - winStart;

        const minPxPerMs = (viewW - padL - padR) / winSpan;
        const pxPerMs = Math.max(minPxPerMs, 1 / 30000);
        const canvasW = Math.max(viewW, Math.round(winSpan * pxPerMs) + padL + padR);
        const W = canvasW - padL - padR, H = rH - padT - padB;

        canvas.style.width = canvasW + 'px'; canvas.style.height = rH + 'px';
        if (canvas.width !== Math.round(canvasW * dpr) || canvas.height !== Math.round(rH * dpr)) {
            canvas.width = Math.round(canvasW * dpr);
            canvas.height = Math.round(rH * dpr);
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, canvasW, rH);

        for (let i = 0; i <= gridLines; i++) {
            const y = padT + (i / gridLines) * H;
            ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + W, y);
            ctx.strokeStyle = `rgba(${inkRGB},.06)`; ctx.lineWidth = .8; ctx.stroke();
        }

        const tx = t => padL + ((t - winStart) / winSpan) * W;
        const nowX = Math.max(padL + 2, Math.min(padL + W - 2, tx(now)));
        const relevantLogs = state.intakes.filter(i => i.time >= winStart - 300000);

        let maxSat = .1;
        for (let xi = 0; xi <= 300; xi++) {
            const t = winStart + (xi / 300) * winSpan;
            maxSat = Math.max(maxSat, satAt(t, relevantLogs));
        }
        maxSat = Math.max(maxSat * 1.15, 0.5);
        const yP = s => padT + H - Math.min(s / maxSat, 1) * H;

        const steps = Math.min(Math.round(W * 2), 2000);
        const pastPts = [], futurePts = [];
        for (let xi = 0; xi <= steps; xi++) {
            const t = winStart + (xi / steps) * winSpan;
            const pt = { x: padL + (xi / steps) * W, y: yP(satAt(t, relevantLogs)) };
            if (t <= now) pastPts.push(pt); else futurePts.push(pt);
        }
        if (pastPts.length && futurePts.length) futurePts.unshift(pastPts[pastPts.length - 1]);

        for (let i = 0; i <= gridLines; i++) {
            ctx.fillStyle = `rgba(${inkRGB},.3)`; ctx.font = `8px 'JetBrains Mono',monospace`; ctx.textAlign = 'right';
            ctx.fillText((maxSat * (gridLines - i) / gridLines).toFixed(1) + 'mg', padL - 3, padT + (i / gridLines) * H + 3);
        }

        const numTicks = Math.max(4, Math.min(12, Math.round(W / 80)));
        for (let i = 0; i <= numTicks; i++) {
            const t = winStart + (i / numTicks) * winSpan;
            const x = tx(t);
            if (Math.abs(t - now) < winSpan * 0.03) continue;
            const d = new Date(t);
            ctx.fillStyle = `rgba(${inkRGB},.32)`; ctx.font = `8px 'JetBrains Mono',monospace`; ctx.textAlign = 'center';
            ctx.fillText(d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0'), x, padT + H + 20);
        }
        ctx.fillStyle = `rgba(${inkRGB},.65)`; ctx.font = `8px 'JetBrains Mono',monospace`; ctx.textAlign = 'center';
        ctx.fillText('now', nowX, padT + H + 20);
        ctx.textAlign = 'left';

        ctx.beginPath(); ctx.moveTo(nowX, padT); ctx.lineTo(nowX, padT + H);
        ctx.strokeStyle = `rgba(${inkRGB},.15)`; ctx.lineWidth = 1; ctx.setLineDash([2, 4]); ctx.stroke(); ctx.setLineDash([]);

        const grad = ctx.createLinearGradient(0, padT, 0, padT + H);
        grad.addColorStop(0, 'rgba(74,124,111,.28)'); grad.addColorStop(1, 'rgba(74,124,111,.01)');
        if (pastPts.length > 1) {
            ctx.beginPath(); pastPts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
            ctx.lineTo(nowX, padT + H); ctx.lineTo(padL, padT + H); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
        }

        if (futurePts.length > 1) {
            const gF = ctx.createLinearGradient(0, padT, 0, padT + H);
            gF.addColorStop(0, 'rgba(74,124,111,.10)'); gF.addColorStop(1, 'rgba(74,124,111,.00)');
            ctx.beginPath(); futurePts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
            ctx.lineTo(futurePts[futurePts.length - 1].x, padT + H); ctx.lineTo(nowX, padT + H); ctx.closePath(); ctx.fillStyle = gF; ctx.fill();
        }

        if (pastPts.length > 1) {
            ctx.beginPath(); pastPts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
            ctx.strokeStyle = 'rgba(74,124,111,.9)'; ctx.lineWidth = 2.5; ctx.stroke();
        }

        if (futurePts.length > 1) {
            ctx.beginPath(); futurePts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
            ctx.strokeStyle = 'rgba(74,124,111,.5)'; ctx.lineWidth = 2; ctx.setLineDash([5, 6]); ctx.stroke(); ctx.setLineDash([]);
        }

        const cSat = satAt(now, relevantLogs);
        if (cSat > 0.05) {
            const msLeft = Math.log(cSat / 0.05) / K;
            const blX = Math.min(tx(now + msLeft), padL + W - 6);
            const hrs = msLeft / 3600000;
            const lbl = hrs < 1 ? Math.round(msLeft / 60000) + 'm left' : hrs.toFixed(1) + 'h left';
            ctx.fillStyle = 'rgba(74,124,111,.6)'; ctx.font = `9px 'JetBrains Mono',monospace`; ctx.textAlign = 'center';
            ctx.fillText(lbl, blX, padT + 14);
            ctx.beginPath(); ctx.moveTo(blX, padT + H - 8); ctx.lineTo(blX, padT + H);
            ctx.strokeStyle = 'rgba(74,124,111,.4)'; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.textAlign = 'left';
        }

        if (state.plannedGap && state.plannedGap > now) {
            const pgX = tx(state.plannedGap);
            if (pgX > nowX && pgX < padL + W) {
                ctx.beginPath(); ctx.moveTo(pgX, padT); ctx.lineTo(pgX, padT + H);
                ctx.strokeStyle = 'rgba(154,106,42,.6)'; ctx.lineWidth = 2; ctx.setLineDash([3, 4]); ctx.stroke(); ctx.setLineDash([]);
                ctx.beginPath(); ctx.arc(pgX, yP(satAt(state.plannedGap, relevantLogs)), 4.5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(154,106,42,.85)'; ctx.fill();
                ctx.fillStyle = 'rgba(154,106,42,.8)'; ctx.font = `8px 'JetBrains Mono',monospace`; ctx.textAlign = 'center';
                ctx.fillText('planned', pgX, padT + 26); ctx.textAlign = 'left';
            }
        }

        relevantLogs.forEach(log => {
            const lx = tx(log.time);
            if (lx < padL || lx > nowX + 2) return;
            const dotY = yP(satAt(log.time + 200, relevantLogs.filter(l => l.time <= log.time + 200)));
            ctx.beginPath(); ctx.arc(lx, dotY, 5.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(74,124,111,.9)'; ctx.fill();
            ctx.strokeStyle = isDark ? 'rgba(20,18,14,.7)' : '#fff'; ctx.lineWidth = 2; ctx.stroke();
            const d = new Date(log.time);
            ctx.fillStyle = 'rgba(74,124,111,.75)'; ctx.font = `9px 'JetBrains Mono',monospace`; ctx.textAlign = 'center';
            ctx.fillText(d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0'), lx, dotY - 12);
            ctx.fillStyle = `rgba(${inkRGB},.45)`; ctx.font = `8px 'JetBrains Mono',monospace`;
            ctx.fillText(P[log.product]?.short ?? '', lx, dotY + 16);
        });

        requestAnimationFrame(() => {
            if (wrap && canvasW > viewW) wrap.scrollLeft = Math.max(0, nowX - viewW * 0.30);
        });
    }

    const todayLogs = state.intakes.filter(l => new Date(l.time).toDateString() === new Date().toDateString());
    const todayMg = todayLogs.reduce((s, l) => s + l.mg, 0);
    const allDays = state.intakes.length > 0
        ? Math.max(1, Math.ceil((Date.now() - Math.min(...state.intakes.map(l => l.time))) / 86400000)) : 1;
    const avgMg = state.intakes.length > 0
        ? (state.intakes.reduce((s, l) => s + l.mg, 0) / allDays).toFixed(1) : '—';
    document.getElementById('govStats').innerHTML = `
  <div class="gov-stat"><div class="gov-stat-val">${todayMg.toFixed(1)}</div><div class="gov-stat-lbl">Today mg</div></div>
  <div class="gov-stat"><div class="gov-stat-val">${todayLogs.length}</div><div class="gov-stat-lbl">Today logs</div></div>
  <div class="gov-stat"><div class="gov-stat-val">${avgMg}</div><div class="gov-stat-lbl">Avg mg/day</div></div>
`;
}


function renderOvHistory() {
    const demoMg = [4.8, 3.2, 5.1, 4.4, 6.0, 3.8, 2.9];
    const days = 7;
    const maxMg = Math.max(...demoMg, 1);
    let html = '';
    for (let d = days - 1; d >= 0; d--) {
        const dt = new Date(); dt.setDate(dt.getDate() - d);
        const isToday = d === 0;
        const dayLogs = state.intakes.filter(l => new Date(l.time).toDateString() === dt.toDateString());
        const mg = isToday ? dayLogs.reduce((s, l) => s + l.mg, 0) : (demoMg[d] ?? 0);
        const pct = Math.min((mg / maxMg) * 100, 100);
        const lbl = isToday ? 'Today' : dt.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
        html += `<div class="ov-hist-day">
      <div class="ov-hist-day-lbl">${lbl}</div>
      <div class="ov-hist-day-bar">
        <div class="ov-hist-bar-track"><div class="ov-hist-bar-fill" style="width:${pct}%;${isToday ? 'background:var(--sage)' : ''}"></div></div>
        <div class="ov-hist-bar-val">${mg.toFixed(1)}mg</div>
      </div>
    </div>`;
    }
    document.getElementById('ovHistoryList').innerHTML = html;
}

/* =========================================================
   TICK — updates metrics & graph
   ========================================================= */
function tick() {
    if (!state.onboarded) return;

    const now = Date.now();
    const sat = satAt(now, state.intakes);
    const satPct = Math.min(sat / SAT_MAX * 100, 100);

    document.getElementById('mSat').textContent = satPct.toFixed(0) + '%';
    document.getElementById('mSat').className = 'met-val';
    if (window.setSatFluid) window.setSatFluid(satPct);
    updateCaffeineCard(satPct);
    maybeFireSaturationAlert(satPct);
   
    const ttb = sat > 0.01 ? Math.ceil(Math.log(sat / 0.05) / K / 60000) : 0;
    const mClear = document.getElementById('mClear');
    if (ttb > 0) {
        mClear.textContent = ttb >= 60 ? (ttb / 60).toFixed(1) + 'h' : ttb + 'm';
        mClear.className = 'met-val ' + (ttb > 60 ? 'warn' : ttb > 30 ? 'amber' : '');
    } else {
        mClear.textContent = 'Clear'; mClear.className = 'met-val sage';
    }

    updateBiometrics();
    showBioDeltaToast();
    const dop = document.getElementById('mDop');
    if (dop) {
        if (satPct > 50) { dop.textContent = 'Elevated'; dop.className = 'met-val amber'; }
        else if (satPct > 20) { dop.textContent = 'Settling'; dop.className = 'met-val'; }
        else if (satPct > 5) { dop.textContent = 'Recovering'; dop.className = 'met-val'; }
        else { dop.textContent = 'Baseline'; dop.className = 'met-val sage'; }
    }

    const combustibleLogs = state.intakes.filter(l => P[l.product]?.combustible);
    if (combustibleLogs.length > 0) {
        const lastCombustible = Math.max(...combustibleLogs.map(l => l.time));
        const elapsed = now - lastCombustible;
        state.lastCombustibleElapsed = elapsed;
    } else {
        state.lastCombustibleElapsed = null;
    }

    // Cumulative clean days (last 30 days)
    {
        const nowMs = Date.now();
        const d = new Date(nowMs);
        const currentMonth = d.getMonth();
        const currentYear = d.getFullYear();
        const monthStartMs = new Date(currentYear, currentMonth, 1).getTime();

        const intakesThisMonth = state.intakes.filter(i => i.time >= monthStartMs);
        const daysWithIntakes = new Set(
            intakesThisMonth.map(i => new Date(i.time).getDate())
        );

        const currentDayOfMonth = d.getDate();
        const cleanDaysSoFar = Math.max(0, currentDayOfMonth - daysWithIntakes.size);
        const cleanPercentage = Math.round((cleanDaysSoFar / currentDayOfMonth) * 100) || 0;

        const streakNumEl = el('streakNum');
        if (streakNumEl) streakNumEl.textContent = `${cleanPercentage}%`;

        const streakSubEl = el('streakSub');
        if (streakSubEl) {
            if (state.intakes.length === 0) {
                streakSubEl.textContent = 'Log intakes to track resilience';
            } else {
                streakSubEl.textContent = `${cleanDaysSoFar} of ${currentDayOfMonth} days clean this month`;
            }
        }

        const gridEl = el('resilienceGrid');
        if (gridEl) {
            gridEl.innerHTML = '';
            for (let i = 27; i >= 0; i--) {
                const targetDate = new Date(nowMs - i * 86400000);
                targetDate.setHours(0, 0, 0, 0);
                const targetStart = targetDate.getTime();
                const targetEnd = targetStart + 86400000;

                const hasIntake = state.intakes.some(intake => intake.time >= targetStart && intake.time < targetEnd);

                const dayDiv = document.createElement('div');
                dayDiv.className = 'resilience-day ' + (hasIntake ? 'used' : 'clean');
                gridEl.appendChild(dayDiv);
            }
        }
    }

    // Milestone checks
    if (state.intakes.length > 0) {
        const lastT = Math.max(...state.intakes.map(i => i.time));
        const cleanMs = now - lastT;
        if (cleanMs > 20 * 60000 && !state.milestones['20m'].shown) { showMilestone('20m'); state.milestones['20m'].shown = true; }
        if (cleanMs > 12 * 3600000 && !state.milestones['12h'].shown) { showMilestone('12h'); state.milestones['12h'].shown = true; }
        if (cleanMs > 72 * 3600000 && !state.milestones['72h'].shown) { showMilestone('72h'); state.milestones['72h'].shown = true; }
    }

    // Budget bar
    const budgetInfo = document.getElementById('budgetInfo');
    if (state.dailyBudget > 0 && budgetInfo) {
        budgetInfo.style.display = 'flex';
        const todayMg = state.intakes.filter(l => new Date(l.time).toDateString() === new Date().toDateString()).reduce((s, l) => s + l.mg, 0);
        const pct = Math.min(todayMg / state.dailyBudget, 1) * 100;
        const remaining = Math.max(0, state.dailyBudget - todayMg).toFixed(1);
        el('budgetFill').style.width = pct + '%';
        el('budgetFill').style.background = pct > 85 ? 'var(--warn)' : pct > 60 ? 'var(--amber-light)' : 'var(--sage)';
        el('budgetLeft').textContent = remaining + 'mg left';
        el('budgetRight').textContent = state.dailyBudget + 'mg daily limit';
    } else if (budgetInfo) {
        budgetInfo.style.display = 'none';
    }

    const ccVal = document.getElementById('ccVal');
    const ccSub = document.getElementById('ccSub');
    if (state.intakes.length > 0) {
        const lastT = Math.max(...state.intakes.map(i => i.time));
        const em = Math.floor((now - lastT) / 60000);
        ccVal.textContent = em < 60 ? em + 'm' : (em / 60).toFixed(1) + 'h';
        ccSub.textContent = 'since last intake';
        const todayLogs = state.intakes.filter(l => new Date(l.time).toDateString() === new Date().toDateString()).sort((a, b) => a.time - b.time);
        let maxGap = 0;
        for (let i = 1; i < todayLogs.length; i++) maxGap = Math.max(maxGap, todayLogs[i].time - todayLogs[i - 1].time);
        document.getElementById('cleanWindow').textContent = maxGap > 0 ? (maxGap / 3600000).toFixed(1) + 'h' : '—';
    } else {
        ccVal.textContent = '—'; ccSub.textContent = 'No intake logged yet';
        document.getElementById('cleanWindow').textContent = '—';
    }

    drawGraph();
    renderPlannedGap();

    if (!tick._lastReflectionCheck || now - tick._lastReflectionCheck > 60000) {
        tick._lastReflectionCheck = now;
        maybeShowReflection();
        maybeShowWeeklySummary();
    }

    requestAnimationFrame(tick);
}

/* =========================================================
   MILESTONE
   ========================================================= */
function showMilestone(key) {
    const ms = state.milestones[key];
    const msIcons = {
        '20m': '<svg viewBox="0 0 24 24" fill="none" stroke="var(--sage)" stroke-width="1.5" width="48" height="48"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
        '12h': '<svg viewBox="0 0 24 24" fill="none" stroke="var(--sage)" stroke-width="1.5" width="48" height="48"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
        '72h': '<svg viewBox="0 0 24 24" fill="none" stroke="var(--sage)" stroke-width="1.5" width="48" height="48"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
    };
    document.getElementById('msRing').innerHTML = msIcons[key] || msIcons['20m'];
    document.getElementById('msTitle').textContent = ms.label + ' clean';
    document.getElementById('msSub').textContent = ms.sub;
    document.getElementById('milestoneOverlay').classList.add('show');
}
function closeMilestone() {
    document.getElementById('milestoneOverlay').classList.remove('show');
}

/* =========================================================
   NAVIGATION
   ========================================================= */
function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('screen-' + id).classList.add('active');
    const nb = document.getElementById('nav-' + id);
    if (nb) nb.classList.add('active');
    const ss = document.getElementById('screen-' + id)?.querySelector('.scr-scroll');
    if (ss) ss.scrollTop = 0;

    const titleMap = {
        stats: 'statsTitleEl', history: 'historyTitleEl', settings: 'settingsTitleEl'
    };
    if (titleMap[id]) {
        const tel = document.getElementById(titleMap[id]);
        if (tel) {
            tel.style.fontSize = '3rem';
            tel.style.letterSpacing = '-.03em'; tel.style.opacity = '1';
        }
    }
    if (id === 'home') {
        const homeTitle = document.querySelector('.home-hero-title');
        if (homeTitle) { homeTitle.style.fontSize = '3rem'; homeTitle.style.letterSpacing = '-.03em'; }
    }

    if (id === 'log') renderLogScreen();
    if (id === 'history') renderHistory();
    if (id === 'stats') { renderStats(); setTimeout(renderRecoveryRings, 100); }
    if (id === 'home') {
        drawGraph(); if (window.setSatFluid) window.setSatFluid(
            Math.min(satAt(Date.now(), state.intakes) / SAT_MAX * 100, 100));
    }
    if (id === 'settings') renderSettingsScreen();
    if (id === 'home') drawGraph();
    updateLogPill(id, 0);
    if (_scrollPillListener && _scrollPillTarget) {
        _scrollPillTarget.removeEventListener('scroll', _scrollPillListener);
    }
    if (id !== 'log' && ss) {
        _scrollPillTarget = ss;
        _scrollPillListener = () => updateLogPill(id, ss.scrollTop);
        ss.addEventListener('scroll', _scrollPillListener, { passive: true });
    }
}

let _scrollPillTarget = null;
let _scrollPillListener = null;

function updateLogPill(screenId, scrollTop) {
    // no-op
}

/* =========================================================
   LOG SCREEN
   ========================================================= */
function renderLogScreen() {
    const pg = document.getElementById('logProdGrid'); pg.innerHTML = '';
    const visibleProds = Object.entries(P);
    visibleProds.forEach(([k, p]) => {
        const b = document.createElement('button'); b.className = 'prod-btn' + (k === state.logSel.product ? ' act' : '');
        b.innerHTML = `<span class="prod-icon">${p.icon}</span><span class="prod-lbl">${p.label}</span>`;
        b.onclick = () => { state.logSel.product = k; state.logSel.strength = P[k].def; state.logSel.brand = null; renderLogScreen(); };
        pg.appendChild(b);
    });

    const brandSec = document.getElementById('logBrandSection');
    const brandRow = document.getElementById('logBrandRow');
    const enabledBrandsForProd = state.enabledBrands[state.logSel.product];
    const brandsToShow = enabledBrandsForProd && enabledBrandsForProd.size > 0
        ? [...enabledBrandsForProd]
        : (BRANDS[state.logSel.product] || []);
    if (brandsToShow.length > 0 && brandSec) {
        brandSec.style.display = 'block';
        brandRow.innerHTML = brandsToShow.map(b => `
      <button class="brand-chip${state.logSel.brand === b ? ' act' : ''}" onclick="selectBrand('${b.replace(/'/g, "\\'")}')">
        ${b}
      </button>`).join('');
    } else if (brandSec) {
        brandSec.style.display = 'none';
    }
    const sr = document.getElementById('logStrRow'); sr.innerHTML = '';
    P[state.logSel.product].strengths.forEach((s, i) => {
        const b = document.createElement('button'); b.className = 'str-btn' + (i === state.logSel.strength ? ' act' : '');
        b.textContent = s.l; b.onclick = () => { state.logSel.strength = i; renderLogScreen(); };
        sr.appendChild(b);
    });

    const tr = document.getElementById('logTrgRow'); tr.innerHTML = '';
    TRIGGERS.forEach(t => {
        const b = document.createElement('button'); b.className = 'trg-btn' + (state.logSel.trigger === t ? ' act' : '');
        b.textContent = t; b.onclick = () => { state.logSel.trigger = state.logSel.trigger === t ? null : t; renderLogScreen(); };
        tr.appendChild(b);
    });

    const mr = document.getElementById('logMoodRow'); mr.innerHTML = '';
    MOODS.forEach((m, i) => {
        const b = document.createElement('button'); b.className = 'mood-btn' + (state.logSel.mood === i ? ' act' : '');
        b.innerHTML = `<span class="mood-em">${m.e}</span><span class="mood-lbl">${m.l}</span>`;
        b.onclick = () => { state.logSel.mood = state.logSel.mood === i ? null : i; renderLogScreen(); };
        mr.appendChild(b);
    });
}

function selectBrand(b) {
    state.logSel.brand = state.logSel.brand === b ? null : b;
    renderLogScreen();
}

function submitLog() {
    const prod = P[state.logSel.product];
    const mg = prod.strengths[state.logSel.strength].mg;
    state.intakes.push({
        time: Date.now(), product: state.logSel.product, mg,
        trigger: state.logSel.trigger, mood: state.logSel.mood, brand: state.logSel.brand
    });
    state.intakes = state.intakes.filter(i => i.time > Date.now() - 12 * 60 * 60 * 1000);

    state.plannedGap = null;
    renderPlannedGap();

    const toast = document.getElementById('logToast');
    const brandPart = state.logSel.brand ? ` · ${state.logSel.brand}` : '';
    if (toast) {
        toast.textContent = `${prod.label}${brandPart} · ${mg}mg logged`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2400);
    }

    state.logSel.trigger = null; state.logSel.mood = null; state.logSel.brand = null;
    renderLogScreen();
}

/* =========================================================
   HOME QUICK LOG
   ========================================================= */
function renderQL() {
    const c = document.getElementById('qlBtns'); c.innerHTML = '';
    state.qlSlots.forEach(k => {
        if (!P[k]) return;
        const p = P[k];
        const b = document.createElement('button');
        b.className = 'ql-btn' + (state.qlProd === k ? ' sel' : '');
        b.innerHTML = `<span class="ql-icon">${p.icon}</span><span class="ql-name">${p.short}</span>`;
        b.onclick = () => { state.qlProd = k; renderQL(); };
        c.appendChild(b);
    });
    document.getElementById('qlDefault').textContent = P[state.qlProd]?.label ?? '';
}

function homeLog() {
    const prod = P[state.qlProd];
    const mg = prod.strengths[state.prodStrengths[state.qlProd]].mg;
    state.intakes.push({ time: Date.now(), product: state.qlProd, mg, trigger: null, mood: null });
    state.intakes = state.intakes.filter(i => i.time > Date.now() - 12 * 60 * 60 * 1000);
    state.plannedGap = null;
    renderPlannedGap();

    const btn = document.getElementById('homeLogBtn');
    btn.style.background = 'var(--sage)';
    btn.textContent = 'Logged';
    setTimeout(() => {
        btn.style.background = '';
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Log intake`;
    }, 1500);
}

/* =========================================================
   HISTORY
   ========================================================= */
function histNav(dir) {
    state.histOffset = Math.max(0, state.histOffset - dir);
    document.getElementById('histNextBtn').disabled = state.histOffset === 0;
    renderHistory();
}

function renderHistory() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - state.histOffset);
    targetDate.setHours(0, 0, 0, 0);
    const isToday = state.histOffset === 0;

    document.getElementById('histDateLbl').textContent = isToday
        ? 'Today'
        : targetDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    document.getElementById('tlSectionTitle').textContent = isToday ? "Today's timeline" : 'Timeline';

    const dayStart = targetDate.getTime();
    const dayEnd = dayStart + 86400000;
    const dayLogs = state.intakes.filter(l => l.time >= dayStart && l.time < dayEnd).sort((a, b) => b.time - a.time);

    const demoEntries = !isToday && dayLogs.length === 0 ? [
        { time: dayStart + 8 * 3600000, product: 'cigarette', mg: 1.2, trigger: 'Routine', mood: 1, brand: 'Gold Flake' },
        { time: dayStart + 12 * 3600000, product: 'cigarette', mg: .6, trigger: 'Stress', mood: 2, brand: 'Gold Flake' },
        { time: dayStart + 18 * 3600000, product: 'vape_pod', mg: .8, trigger: 'Social', mood: 0, brand: 'Elf Bar' },
    ] : dayLogs;

    const totalMg = demoEntries.reduce((s, l) => s + l.mg, 0);

    document.getElementById('dailySummary').innerHTML = `
    <div class="sum-chip"><div class="sum-lbl">Total</div><div class="sum-val">${totalMg.toFixed(1)}<span class="sum-unit"> mg</span></div></div>
    <div class="sum-chip"><div class="sum-lbl">Entries</div><div class="sum-val">${demoEntries.length}<span class="sum-unit"> logs</span></div></div>
    <div class="sum-chip"><div class="sum-lbl">Products</div><div class="sum-val">${[...new Set(demoEntries.map(l => l.product))].length || '—'}</div></div>
    <div class="sum-chip"><div class="sum-lbl">First log</div><div class="sum-val" style="font-size:.9rem">${demoEntries.length > 0 ? new Date(Math.min(...demoEntries.map(l => l.time))).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}</div></div>
  `;

    const tl = document.getElementById('histTimeline');
    if (demoEntries.length === 0) {
        tl.innerHTML = '<div class="no-logs">No intakes logged</div>';
    } else {
        tl.innerHTML = demoEntries.map(log => {
            const pr = P[log.product];
            const trg = log.trigger ? `<span class="trg-badge">${log.trigger}</span>` : '';
            const brnd = log.brand ? `<span style="font-family:var(--font-mono);font-size:.46rem;color:var(--ink-faint);margin-left:4px">${log.brand}</span>` : '';
            const t = new Date(log.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            return `<div class="tl-item"><div class="tl-dot"></div>
        <div class="tl-time">${t}</div>
        <div class="tl-prod"><span style="display:inline-flex;width:16px;height:16px;vertical-align:middle;margin-right:2px">${pr?.icon ?? ''}</span>${pr?.label ?? log.product}${trg}${brnd}</div>
        <div class="tl-detail">${log.mg}mg nicotine · ${pr?.label ?? ''}</div>
      </div>`;
        }).join('');
    }

    drawWeekChart();
}

function drawWeekChart() {
    const canvas = document.getElementById('weekChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr; canvas.height = 64 * dpr;
    ctx.scale(dpr, dpr);
    const W = canvas.offsetWidth, H = 64;
    const demoMg = [4.8, 3.2, 5.1, 4.4, 6.0, 3.8];
    const days = Array.from({ length: 7 }, (_, d) => {
        const dt = new Date(); dt.setDate(dt.getDate() - (6 - d));
        const isToday = d === 6;
        const dayStart = new Date(dt); dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(dayStart); dayEnd.setDate(dayEnd.getDate() + 1);
        const mg = isToday
            ? state.intakes.filter(l => l.time >= dayStart && l.time < dayEnd).reduce((s, l) => s + l.mg, 0)
            : demoMg[d] ?? 0;
        return { lbl: dt.toLocaleDateString('en-US', { weekday: 'narrow' }), fullLbl: dt.toLocaleDateString('en-US', { weekday: 'short' }), mg, isToday };
    });
    const maxMg = Math.max(...days.map(d => d.mg), .1);
    const bw = (W - 12) / 7 - 2;
    days.forEach((day, i) => {
        const x = 6 + i * (bw + 2);
        const bh = Math.max(3, (day.mg / maxMg) * (H - 22));
        const y = H - 16 - bh;
        ctx.fillStyle = day.isToday ? 'rgba(74,124,111,.9)' : 'rgba(26,23,20,.1)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, y, bw, bh, 2);
        else ctx.rect(x, y, bw, bh);
        ctx.fill();
        ctx.fillStyle = day.isToday ? '#4a7c6f' : 'rgba(26,23,20,.3)';
        ctx.font = `7.5px 'JetBrains Mono',monospace`; ctx.textAlign = 'center';
        ctx.fillText(day.lbl, x + bw / 2, H - 3);
        if (day.mg > 0) {
            ctx.fillStyle = day.isToday ? 'rgba(74,124,111,.8)' : 'rgba(26,23,20,.3)';
            ctx.font = `7px 'JetBrains Mono',monospace`;
            ctx.fillText(day.mg.toFixed(1), x + bw / 2, y - 2);
        }
    });
}

/* =========================================================
   STATS
   ========================================================= */
function renderStats() {
    const tc = { Stress: 38, Routine: 28, Social: 18, Boredom: 10, Automatic: 6 };
    state.intakes.forEach(l => { if (l.trigger && tc[l.trigger] !== undefined) tc[l.trigger] += 5; });
    const tot = Object.values(tc).reduce((a, b) => a + b, 0);
    document.getElementById('trgBreakdown').innerHTML = Object.entries(tc).map(([n, c]) => {
        const pct = Math.round((c / tot) * 100);
        return `<div class="trg-row-item"><div class="trg-name">${n}</div>
      <div class="trg-bar-track"><div class="trg-bar-fill" style="width:${pct}%"></div></div>
      <div class="trg-pct">${pct}%</div></div>`;
    }).join('');
    const allMg = state.intakes.reduce((s, l) => s + l.mg, 0);
    const days = state.intakes.length > 0 ? Math.max(1, Math.ceil((Date.now() - Math.min(...state.intakes.map(l => l.time))) / 86400000)) : 1;
    const avg = state.intakes.length > 0 ? (allMg / days).toFixed(1) : '4.2';
    document.getElementById('avgDose').innerHTML = avg + '<span style="font-size:.95rem"> mg</span>';
    renderRecoveryRings();
}

/* =========================================================
   SETTINGS
   ========================================================= */
function renderSettingsScreen() {
    const sd = document.getElementById('settingsDate');
    if (sd) sd.textContent = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();
    const c = document.getElementById('sDefaultProd'); c.innerHTML = '';
    Object.entries(P).forEach(([k, p]) => {
        const b = document.createElement('button');
        b.className = 'prd-btn' + (k === state.defaultProd ? ' act' : '');
        b.innerHTML = `<span class="prd-icon">${p.icon}</span><span>${p.short}</span>`;
        b.onclick = () => { state.defaultProd = k; state.qlProd = k; renderQL(); renderSettingsScreen(); };
        c.appendChild(b);
    });

    const slotRow = document.getElementById('qlSlotRow'); slotRow.innerHTML = '';
    Object.entries(P).forEach(([k, p]) => {
        const on = state.qlSlots.includes(k);
        const chip = document.createElement('button');
        chip.className = 'ql-slot-chip' + (on ? ' on' : '');
        chip.innerHTML = `<span class="prd-icon">${p.icon}</span>${p.short}`;
        chip.onclick = () => {
            if (on) { state.qlSlots = state.qlSlots.filter(x => x !== k); }
            else { state.qlSlots = [...state.qlSlots, k]; }
            renderQL(); renderSettingsScreen();
        };
        slotRow.appendChild(chip);
    });

    const ap = P[state.defaultProd];
    document.getElementById('sStrengthCard').innerHTML = `
    <div class="settings-row" style="flex-direction:column;align-items:flex-start;gap:.45rem">
      <div><div class="sr-lbl"><span style="display:inline-flex;vertical-align:middle;margin-right:.3rem">${ap.icon}</span>${ap.label}</div><div class="sr-sub">Default strength for quick-log</div></div>
      <div class="strength-row">${ap.strengths.map((s, i) => `
        <button class="str-btn${i === state.prodStrengths[state.defaultProd] ? ' act' : ''}"
          onclick="state.prodStrengths['${state.defaultProd}']=${i};renderSettingsScreen()">${s.l}</button>
      `).join('')}</div>
    </div>`;

    const bw = document.getElementById('brandSettingsWrap'); bw.innerHTML = '';
    Object.entries(BRANDS).forEach(([prodKey, brandList]) => {
        const prod = P[prodKey]; if (!prod) return;
        const enabledSet = state.enabledBrands[prodKey];
        const allOn = brandList.every(b => enabledSet.has(b));
        const someOn = brandList.some(b => enabledSet.has(b));

        const block = document.createElement('div');
        block.className = 'brand-cat-block';
        block.id = 'bcat-' + prodKey;

        const iconSvg = prod.icon;
        const countOn = brandList.filter(b => enabledSet.has(b)).length;

        block.innerHTML = `
      <div class="brand-cat-header" onclick="toggleBrandCat('${prodKey}')">
        <div class="brand-cat-left">
          <div class="brand-cat-icon">${iconSvg}</div>
          <div>
            <div class="brand-cat-name">${prod.label}</div>
            <div class="brand-cat-count">${countOn} of ${brandList.length} selected</div>
          </div>
        </div>
        <div class="brand-cat-right">
          <button class="brand-cat-all-toggle ${allOn ? '' : 'none'}" onclick="event.stopPropagation();toggleAllBrands('${prodKey}')">${allOn ? 'Deselect all' : someOn ? 'Select all' : 'Select all'}</button>
          <span class="brand-cat-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg></span>
        </div>
      </div>
      <div class="brand-cat-body">
        <div class="brand-toggle-grid" id="btg-${prodKey}"></div>
      </div>`;

        bw.appendChild(block);

        const grid = document.getElementById('btg-' + prodKey);
        brandList.forEach(brand => {
            const on = enabledSet.has(brand);
            const tog = document.createElement('div');
            tog.className = 'brand-toggle' + (on ? ' on' : '');
            tog.innerHTML = `<span class="brand-toggle-name">${brand}</span><span class="brand-toggle-dot"></span>`;
            tog.onclick = () => {
                if (enabledSet.has(brand)) enabledSet.delete(brand);
                else enabledSet.add(brand);
                renderSettingsScreen();
            };
            grid.appendChild(tog);
        });
    });
}

function toggleBrandCat(prodKey) {
    const block = document.getElementById('bcat-' + prodKey);
    block.classList.toggle('open');
}

function toggleAllBrands(prodKey) {
    const brandList = BRANDS[prodKey];
    const enabledSet = state.enabledBrands[prodKey];
    const allOn = brandList.every(b => enabledSet.has(b));
    if (allOn) { enabledSet.clear(); }
    else { brandList.forEach(b => enabledSet.add(b)); }
    renderSettingsScreen();
}

/* =========================================================
   LOCATION MANUAL/DETECT & BRAND REFRESH
   ========================================================= */
function applyLocationUpdate(code) {
    currentCountry = code;
    state.userCountry = code;

    const dropdown = document.getElementById('manualLocSelect');
    if (dropdown && Array.from(dropdown.options).some(o => o.value === code)) {
        dropdown.value = code;
    }

    BRANDS = JSON.parse(JSON.stringify(BRANDS_BY_COUNTRY[code] || BRANDS_BY_COUNTRY.DEFAULT));

    Object.keys(BRANDS).forEach(k => {
        const prev = state.enabledBrands[k];
        const newList = BRANDS[k];
        if (prev) {
            const filtered = new Set(newList.filter(b => prev.has(b)));
            state.enabledBrands[k] = filtered.size > 0 ? filtered : new Set(newList);
        } else {
            state.enabledBrands[k] = new Set(newList);
        }
    });
    renderSettingsScreen();
    renderLogScreen();
}

function changeLocation(code) {
    applyLocationUpdate(code);
}

function detectLocation() {
    fetch('https://ipapi.co/json/')
        .then(r => r.json())
        .then(data => {
            const code = data.country_code || 'DEFAULT';
            applyLocationUpdate(code);
        })
        .catch(() => {
            applyLocationUpdate('DEFAULT');
        });
}

window.downloadShareCard = function () {
    const canvas = document.getElementById('shareCanvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'pulse-progress-' + new Date().toISOString().slice(0, 10) + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
};

window.generateShareCard = function () {
    const canvas = document.getElementById('shareCanvas');
    if (!canvas) return;
 
    document.fonts.ready.then(function () {
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        const isDark = state.darkMode || state.amoledMode;
 
        // Background
        const bg = ctx.createLinearGradient(0, 0, W, H);
        if (isDark) { bg.addColorStop(0, '#1c1a16'); bg.addColorStop(1, '#0f0e0c'); }
        else { bg.addColorStop(0, '#f2ede5'); bg.addColorStop(1, '#ddd8ce'); }
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
 
        // Decorative arc
        ctx.beginPath();
        ctx.arc(W + 80, -80, W * 0.72, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(90,156,143,.07)' : 'rgba(74,124,111,.06)';
        ctx.lineWidth = 120; ctx.stroke();
 
        // Compute stats
        const nowMs = Date.now(), d = new Date(nowMs);
        const monthStartMs = new Date(d.getFullYear(), d.getMonth(), 1).getTime();
        const intakesThisMonth = state.intakes.filter(i => i.time >= monthStartMs);
        const daysWithIntakes = new Set(intakesThisMonth.map(i => new Date(i.time).getDate()));
        const currentDay = d.getDate();
        const cleanDays = Math.max(0, currentDay - daysWithIntakes.size);
        const cleanPct = Math.round((cleanDays / currentDay) * 100) || 0;
 
        const inkCol = isDark ? '#f0ede8' : '#1a1714';
        const sageCol = isDark ? '#5a9c8f' : '#4a7c6f';
        const dimCol = isDark ? '#726a62' : '#9a9288';
 
        // Top label
        ctx.font = '300 44px "JetBrains Mono",monospace';
        ctx.fillStyle = dimCol; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.fillText('PULSE  ·  ' + new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase(), 88, 88);
 
        // Divider
        ctx.beginPath(); ctx.moveTo(88, 158); ctx.lineTo(W - 88, 158);
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,.07)' : 'rgba(26,23,20,.07)';
        ctx.lineWidth = 2; ctx.stroke();
 
        // Big number — scale font to prevent clipping on 2-3 digit numbers
        const numStr = cleanDays.toString();
        const numFontSize = numStr.length >= 3 ? 250 : numStr.length === 2 ? 310 : 380;
        ctx.font = '300 ' + numFontSize + 'px "Fraunces",serif';
        ctx.fillStyle = sageCol; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
        ctx.fillText(numStr, 88, H * 0.52);
 
        // Labels
        ctx.font = '300 72px "Fraunces",serif';
        ctx.fillStyle = inkCol; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.fillText('clean days', 90, H * 0.55);
        ctx.font = '300 56px "Fraunces",serif';
        ctx.fillStyle = dimCol;
        ctx.fillText('this month', 90, H * 0.55 + 88);
 
        // Percentage top-right
        ctx.font = '400 96px "JetBrains Mono",monospace';
        ctx.fillStyle = sageCol; ctx.textAlign = 'right'; ctx.textBaseline = 'top';
        ctx.fillText(cleanPct + '%', W - 88, 200);
        ctx.font = '300 38px "JetBrains Mono",monospace';
        ctx.fillStyle = dimCol;
        ctx.fillText('of days clean', W - 88, 314);
 
        // Resilience mini-grid
        const gX = 90, gY = H * 0.72;
        const cols = 7, cellSz = 56, cellGap = 12;
        const rows = 4;
        for (let i = 0; i < cols * rows; i++) {
            const daysAgo = cols * rows - 1 - i;
            const date = new Date(nowMs - daysAgo * 86400000); date.setHours(0, 0, 0, 0);
            const dayStart = date.getTime(), dayEnd = dayStart + 86400000;
            const hasIntake = state.intakes.some(x => x.time >= dayStart && x.time < dayEnd);
            const col = i % cols, row = Math.floor(i / cols);
            const cx = gX + col * (cellSz + cellGap), cy = gY + row * (cellSz + cellGap);
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(cx, cy, cellSz, cellSz, 10); else ctx.rect(cx, cy, cellSz, cellSz);
            ctx.fillStyle = hasIntake
                ? (isDark ? 'rgba(192,96,80,.38)' : 'rgba(138,58,42,.28)')
                : (isDark ? 'rgba(90,156,143,.55)' : 'rgba(74,124,111,.45)');
            ctx.fill();
        }
 
        // Grid label
        ctx.font = '300 36px "JetBrains Mono",monospace';
        ctx.fillStyle = dimCol; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.fillText('last 28 days', gX, gY + rows * (cellSz + cellGap) + 20);
 
        // Footer
        ctx.font = '300 34px "JetBrains Mono",monospace';
        ctx.fillStyle = dimCol; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText('Local data only · Private progress · Not medical advice', W / 2, H - 72);
 
        document.getElementById('shareCardShell').classList.remove('done');
    });
};

function _drawShareCard(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const isDark = state.darkMode || state.amoledMode;

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H);
    if (isDark) { bg.addColorStop(0, '#1c1a16'); bg.addColorStop(1, '#0f0e0c'); }
    else { bg.addColorStop(0, '#f2ede5'); bg.addColorStop(1, '#ddd8ce'); }
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Decorative arc background
    ctx.beginPath();
    ctx.arc(W + 80, -80, W * 0.72, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(90,156,143,.07)' : 'rgba(74,124,111,.06)';
    ctx.lineWidth = 120; ctx.stroke();

    // Compute stats
    const nowMs = Date.now(), d = new Date(nowMs);
    const monthStartMs = new Date(d.getFullYear(), d.getMonth(), 1).getTime();
    const intakesThisMonth = state.intakes.filter(i => i.time >= monthStartMs);
    const daysWithIntakes = new Set(intakesThisMonth.map(i => new Date(i.time).getDate()));
    const currentDay = d.getDate();
    const cleanDays = Math.max(0, currentDay - daysWithIntakes.size);
    const cleanPct = Math.round((cleanDays / currentDay) * 100) || 0;

    const inkCol = isDark ? '#f0ede8' : '#1a1714';
    const sageCol = isDark ? '#5a9c8f' : '#4a7c6f';
    const dimCol = isDark ? '#726a62' : '#9a9288';

    // Top label
    ctx.font = '300 44px "JetBrains Mono",monospace';
    ctx.fillStyle = dimCol; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('PULSE  ·  ' + new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase(), 88, 88);

    // Divider line
    ctx.beginPath(); ctx.moveTo(88, 158); ctx.lineTo(W - 88, 158);
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,.07)' : 'rgba(26,23,20,.07)';
    ctx.lineWidth = 2; ctx.stroke();

    // Big number — scale font down for 3-digit numbers to prevent clipping
    const numStr = cleanDays.toString();
    const numFontSize = numStr.length >= 3 ? 260 : numStr.length === 2 ? 320 : 380;
    ctx.font = `300 ${numFontSize}px "Fraunces",serif`;
    ctx.fillStyle = sageCol; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(numStr, 72, H * 0.52);

    // Label
    ctx.font = '300 72px "Fraunces",serif';
    ctx.fillStyle = inkCol; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('clean days', 90, H * 0.55);
    ctx.font = '300 56px "Fraunces",serif';
    ctx.fillStyle = dimCol;
    ctx.fillText('this month', 90, H * 0.55 + 88);

    // Percentage top-right
    ctx.font = '400 96px "JetBrains Mono",monospace';
    ctx.fillStyle = sageCol; ctx.textAlign = 'right'; ctx.textBaseline = 'top';
    ctx.fillText(cleanPct + '%', W - 88, 200);
    ctx.font = '300 38px "JetBrains Mono",monospace';
    ctx.fillStyle = dimCol;
    ctx.fillText('of days clean', W - 88, 314);

    // Resilience mini-grid
    const gX = 90, gY = H * 0.72;
    const cols = 7, cellSz = 56, cellGap = 12;
    const rows = 4;
    for (let i = 0; i < cols * rows; i++) {
        const daysAgo = cols * rows - 1 - i;
        const date = new Date(nowMs - daysAgo * 86400000); date.setHours(0,0,0,0);
        const dayStart = date.getTime(), dayEnd = dayStart + 86400000;
        const hasIntake = state.intakes.some(x => x.time >= dayStart && x.time < dayEnd);
        const col = i % cols, row = Math.floor(i / cols);
        const cx = gX + col * (cellSz + cellGap), cy = gY + row * (cellSz + cellGap);
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(cx, cy, cellSz, cellSz, 10); else ctx.rect(cx, cy, cellSz, cellSz);
        ctx.fillStyle = hasIntake
            ? (isDark ? 'rgba(192,96,80,.38)' : 'rgba(138,58,42,.28)')
            : (isDark ? 'rgba(90,156,143,.55)' : 'rgba(74,124,111,.45)');
        ctx.fill();
    }

    // Grid label
    ctx.font = '300 36px "JetBrains Mono",monospace';
    ctx.fillStyle = dimCol; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('last 28 days', gX, gY + rows * (cellSz + cellGap) + 20);

    // Footer
    ctx.font = '300 34px "JetBrains Mono",monospace';
    ctx.fillStyle = dimCol; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText('Local data only · Private progress · Not medical advice', W / 2, H - 72);

document.getElementById('shareCardShell').classList.remove('done');
}

function updateMode() {
    const sel = document.getElementById('modeSelect');
    if (!sel) return;
    state.mode = sel.value;
    const modeDefaults = {
        'Track only': { budget: 0, budgetLabel: 'No limit' },
        'Reduce gradually': { budget: 5, budgetLabel: '5 mg' },
        'Understand patterns': { budget: 0, budgetLabel: 'No limit' },
        'Quit support': { budget: 3, budgetLabel: '3 mg' },
    };
    // Called during onboarding card selection
   let _onbMode = 'focused';
   function onbSelectMode(mode) {
       _onbMode = mode;
       document.getElementById('onbModeFocused').classList.toggle('on', mode === 'focused');
       document.getElementById('onbModeFull').classList.toggle('on', mode === 'full');
   }
   function applyOnbMode() {
       state.pulseMode = _onbMode;
       applyMode();
   }
   window.onbSelectMode = onbSelectMode;
   window.applyOnbMode = applyOnbMode;
   
   // Wire the existing modeSelect dropdown in settings to also write pulseMode
   function applyMode() {
      const ring = document.getElementById('satRing'); // your actual ring wrapper id
      const bar  = document.getElementById('focusedProgressBar');
      if (ring) ring.style.display = isFull ? '' : 'none';
      if (bar)  bar.style.display  = isFull ? 'none' : '';
       const isFull = state.pulseMode === 'full';
       // Biometrics section
       const bio = document.getElementById('bioLockable');
       if (bio) bio.style.display = isFull ? '' : 'none';
       // Saturation ring / nicotine curve card
       const satCard = document.getElementById('satCard'); // ← check your actual ID
       if (satCard) satCard.style.display = isFull ? '' : 'none';
       // Caffeine interaction card
       const caffCard = document.getElementById('caffeineCard');
       if (caffCard) caffCard.style.display = isFull ? '' : 'none';
       // HRV/metric tiles — wrap them in a container with id="advancedTiles" (see step D)
       const advTiles = document.getElementById('advancedTiles');
       if (advTiles) advTiles.style.display = isFull ? '' : 'none';
       // Sync the settings dropdown to match
       const sel = document.getElementById('interfaceModeSelect'); // new select — see step E
       if (sel) sel.value = state.pulseMode;
   }
    const defaults = modeDefaults[state.mode];
    if (defaults) {
        if (defaults.budget > 0 && state.dailyBudget === 0) {
            state.dailyBudget = defaults.budget;
            const bSel = document.getElementById('budgetSelect');
            if (bSel) bSel.value = defaults.budgetLabel;
        }
    }
    const quitTip = document.getElementById('quitTipCard');
    if (quitTip) quitTip.style.display = state.mode === 'Quit support' ? '' : 'none';
}

function updateBudget() {
    const sel = document.getElementById('budgetSelect').value;
    state.dailyBudget = sel === 'No limit' ? 0 : parseInt(sel);
}

/* =========================================================
   PLANNED GAP
   ========================================================= */
function setPlannedGap(mins) {
    state.plannedGap = Date.now() + mins * 60000;
    state.plannedGapMins = mins;
    renderPlannedGap();
}

function clearPlannedGap() {
    state.plannedGap = null;
    state.plannedGapMins = null;
    renderPlannedGap();
}

function renderPlannedGap() {
    const statusEl = document.getElementById('pgStatus');
    const clearBtn = document.getElementById('pgClearBtn');
    const pills = document.querySelectorAll('.pg-pill:not(.pg-clear)');
    if (!statusEl) return;

    if (state.plannedGap && state.plannedGap > Date.now()) {
        const minsLeft = Math.round((state.plannedGap - Date.now()) / 60000);
        const h = Math.floor(minsLeft / 60), m = minsLeft % 60;
        statusEl.textContent = h > 0 ? `in ${h}h ${m}m` : `in ${m}m`;
        if (clearBtn) clearBtn.style.display = '';
        pills.forEach(p => {
            p.classList.toggle('active', p.getAttribute('onclick').includes(String(state.plannedGapMins)));
        });
    } else {
        statusEl.textContent = '—';
        if (clearBtn) clearBtn.style.display = 'none';
        pills.forEach(p => p.classList.remove('active'));
        state.plannedGap = null;
        state.plannedGapMins = null;
    }
}

/* =========================================================
   DAILY REFLECTION
   ========================================================= */
const REFLECTION_TRIGGERS = ['Stress', 'Boredom', 'Routine', 'Social', 'Craving', 'Automatic'];

function maybeShowReflection() {
    const today = new Date().toDateString();
    if (state.reflection.lastPromptDate === today) return;
    const hour = new Date().getHours();
    if (hour < 20) return;
    const todayLogs = state.intakes.filter(i => new Date(i.time).toDateString() === today);
    if (todayLogs.length < 2) return;

    state.reflection.lastPromptDate = today;
    renderReflectionCard(todayLogs);
}

function renderReflectionCard(todayLogs) {
    const card = document.getElementById('reflectionCard');
    if (!card) return;

    const trgCounts = {};
    todayLogs.forEach(l => { if (l.trigger) trgCounts[l.trigger] = (trgCounts[l.trigger] || 0) + 1; });
    const topTrigger = Object.keys(trgCounts).sort((a, b) => trgCounts[b] - trgCounts[a])[0];

    const qEl = document.getElementById('rcQuestion');
    if (qEl) qEl.textContent = topTrigger
        ? `Most of today's intakes were tagged as "${topTrigger}". Does that feel accurate?`
        : 'What triggered most of your intakes today?';

    const optEl = document.getElementById('rcOptions');
    if (optEl) {
        const opts = topTrigger
            ? ['Yes, that sounds right', 'Not really', 'A mix of things']
            : REFLECTION_TRIGGERS;
        optEl.innerHTML = opts.map(o => `
                    <button class="rc-opt" onclick="selectReflection(this,'${o.replace(/'/g, "\\'")}')">${o}</button>
                `).join('');
    }

    card.style.display = '';
}

function selectReflection(btn, answer) {
    document.querySelectorAll('.rc-opt').forEach(b => b.classList.remove('sel'));
    btn.classList.add('sel');
    state.reflection.answers.push({ date: new Date().toDateString(), answer, ts: Date.now() });
    setTimeout(dismissReflection, 1400);
}

function dismissReflection() {
    const card = document.getElementById('reflectionCard');
    if (card) card.style.display = 'none';
}

/* =========================================================
   WEEKLY SUMMARY
   ========================================================= */
function forceWeeklySummary() {
    state.weeklySummary.lastGenDate = null;
    generateWeeklySummary();
    switchScreen('home');
}

function maybeShowWeeklySummary() {
    if (state.intakes.length === 0) return;
    const oldestLog = Math.min(...state.intakes.map(i => i.time));
    const daysSinceFirst = (Date.now() - oldestLog) / 86400000;
    if (daysSinceFirst < 7) return;

    const today = new Date();
    const weekKey = `week-${today.getFullYear()}-${today.getMonth()}-${Math.floor(today.getDate() / 7)}`;
    if (state.weeklySummary.lastGenDate === weekKey) return;
    state.weeklySummary.lastGenDate = weekKey;
    generateWeeklySummary();
}

function generateWeeklySummary() {
    const now = Date.now();
    const weekAgo = now - 7 * 86400000;
    const weekLogs = state.intakes.filter(i => i.time >= weekAgo);

    const daysWithIntakes = new Set(weekLogs.map(i => new Date(i.time).toDateString()));
    const cleanDays = 7 - daysWithIntakes.size;
    const totalMg = weekLogs.reduce((s, l) => s + l.mg, 0);

    const dayCounts = {};
    for (let d = 0; d < 7; d++) {
        const dt = new Date(now - d * 86400000);
        const ds = dt.toDateString();
        dayCounts[ds] = weekLogs.filter(i => new Date(i.time).toDateString() === ds).length;
    }
    const cleanestDay = Object.entries(dayCounts).sort((a, b) => a[1] - b[1])[0];
    const cleanestDayName = cleanestDay
        ? new Date(cleanestDay[0]).toLocaleDateString('en-US', { weekday: 'long' })
        : null;

    const trgCounts = {};
    weekLogs.forEach(l => { if (l.trigger) trgCounts[l.trigger] = (trgCounts[l.trigger] || 0) + 1; });
    const topTrigger = Object.keys(trgCounts).sort((a, b) => trgCounts[b] - trgCounts[a])[0];

    let sentence = '';
    if (weekLogs.length === 0) {
        sentence = 'No intakes logged this week — a clean week in the data.';
    } else if (cleanDays >= 5) {
        sentence = `${cleanDays} clean days this week. ${cleanestDayName ? cleanestDayName + ' was your best.' : ''} ${topTrigger ? topTrigger + ' was the most common trigger on the other days.' : ''}`.trim();
    } else if (cleanDays > 0) {
        sentence = `You logged intakes on ${7 - cleanDays} days this week (${totalMg.toFixed(1)}mg total). ${cleanestDayName ? cleanestDayName + ' was your cleanest day.' : ''}${topTrigger ? ' Most common trigger: ' + topTrigger + '.' : ''}`.trim();
    } else {
        sentence = `Intakes every day this week — ${totalMg.toFixed(1)}mg total. ${topTrigger ? topTrigger + ' came up most.' : ''} A pattern worth watching.`.trim();
    }

    state.weeklySummary.text = sentence;

    const card = document.getElementById('weeklyCard');
    const sentEl = document.getElementById('wkSentence');
    if (sentEl) sentEl.textContent = sentence;
    if (card) card.style.display = '';
}

function dismissWeeklySummary() {
    const card = document.getElementById('weeklyCard');
    if (card) card.style.display = 'none';
}

function shareWeeklySummary() {
    const text = state.weeklySummary.text || 'My weekly Pulse summary';
    if (navigator.share) {
        navigator.share({ title: 'Pulse — Weekly summary', text }).catch(() => { });
    } else {
        navigator.clipboard?.writeText(text).then(() => {
            const toast = document.getElementById('logToast');
            if (toast) { toast.textContent = 'Copied to clipboard'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2000); }
        }).catch(() => { });
    }
}

/* =========================================================
   EXPORT
   ========================================================= */
function exportData(format) {
    const toast = document.getElementById('logToast');
    toast.textContent = `Exported as ${format.toUpperCase()}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

/* =========================================================
   CRAVE TIMER
   ========================================================= */
const CIRC = 2 * Math.PI * 57;
function openCrave() {
    const ov = document.getElementById('craveOverlay'); ov.classList.add('show');
    const ring = document.getElementById('craveRingEl');
    const tel = document.getElementById('craveTimeEl');
    const ctxEl = document.getElementById('craveCtxEl') || (() => {
        const el = document.createElement('div');
        el.id = 'craveCtxEl';
        el.style.marginTop = '1.5rem';
        el.style.textAlign = 'center';
        el.style.fontFamily = 'var(--font-sans)';
        el.style.color = 'var(--ink-dim)';
        el.style.fontSize = '0.9rem';
        el.style.lineHeight = '1.4';
        el.style.maxWidth = '280px';
        document.querySelector('#craveOverlay .crave-circle').after(el);
        return el;
    })();

const commitment = localStorage.getItem('pulse_commitment');
const partner = localStorage.getItem('pulse_partner_name');

if (partner || commitment) {
    let html = '';
    if (partner) {
        html += `
        <div style="margin-bottom:.85rem">
            <div style="font-family:var(--font-mono);font-size:.52rem;text-transform:uppercase;letter-spacing:.1em;color:var(--amber);margin-bottom:.35rem">What would ${partner} say?</div>
            <div style="font-family:var(--font-serif);font-size:.92rem;font-style:italic;color:var(--ink-mid);line-height:1.5">"You've got this. Ride it out — it's just chemistry."</div>
        </div>`;
    }
    if (commitment) {
        html += `
        <div>
            <div style="font-family:var(--font-mono);font-size:.52rem;text-transform:uppercase;letter-spacing:.1em;color:var(--sage);margin-bottom:.35rem">Your Why</div>
            <div style="font-family:var(--font-serif);font-size:.88rem;font-style:italic;color:var(--ink);line-height:1.5">"${commitment}"</div>
        </div>`;
    }
    ctxEl.innerHTML = html;
} else {
    ctxEl.innerHTML = `<div style="font-size:.85rem;color:var(--ink-dim);line-height:1.6">This craving is a chemical signal from your nervous system.<br>It will pass.</div>`;
}

    ring.style.strokeDasharray = CIRC; ring.style.strokeDashoffset = 0;
    let rem = 600;
    if (state.craveInterval) clearInterval(state.craveInterval);
    state.craveInterval = setInterval(() => {
        rem--;
        const m = Math.floor(rem / 60), s = rem % 60;
        tel.textContent = `${m}:${s.toString().padStart(2, '0')}`;
        ring.style.strokeDashoffset = CIRC * (1 - rem / 600);
        if (rem <= 0) { clearInterval(state.craveInterval); tel.textContent = '✓'; ring.style.stroke = 'var(--sage)'; }
    }, 1000);
}
function closeCrave() {
    if (state.craveInterval) clearInterval(state.craveInterval);
    document.getElementById('craveOverlay').classList.remove('show');
}

/* =========================================================
   ONEUI SCROLL COLLAPSE
   ========================================================= */
function initHomeScroll() {
    const scroll = document.getElementById('homeScroll');
    const hero = document.getElementById('homeHero');
    if (!scroll || !hero) return;
    const titleEl = hero.querySelector('.home-hero-title');
    if (!titleEl) return;

    let _lastT = -1;
    scroll.addEventListener('scroll', () => {
        const t = scroll.scrollTop;
        if (Math.abs(t - _lastT) < 1) return;
        _lastT = t;
        const maxScroll = 55;
        const progress = Math.min(t / maxScroll, 1);
        const size = 3 - (3 - 1.75) * progress;
        titleEl.style.fontSize = size + 'rem';
        const ls = -0.03 - 0.01 * progress;
        titleEl.style.letterSpacing = ls + 'em';
    }, { passive: true });
}

function initScreenScroll(scrollId, titleId) {
    const scroll = document.getElementById(scrollId);
    const titleEl = document.getElementById(titleId);
    if (!scroll || !titleEl) return;

    const BIG = 3, SMALL = 1.75, MAXSCROLL = 55;
    let _last = -1;

    scroll.addEventListener('scroll', () => {
        const t = scroll.scrollTop;
        if (Math.abs(t - _last) < 1) return;
        _last = t;
        const p = Math.min(t / MAXSCROLL, 1);
        titleEl.style.fontSize = (BIG - (BIG - SMALL) * p) + 'rem';
        titleEl.style.letterSpacing = (-0.03 - 0.01 * p) + 'em';
        titleEl.style.opacity = (1 - p * 0.25).toString();
    }, { passive: true });
}

/* =========================================================
   BRAND PREFS ACCORDION IN SETTINGS
   ========================================================= */
let _brandPrefsOpen = false;
function toggleBrandPrefs() {
    _brandPrefsOpen = !_brandPrefsOpen;
    const el = document.getElementById('brandPrefsExpanded');
    const chevron = document.getElementById('brandPrefsChevron');
    el.style.maxHeight = _brandPrefsOpen ? el.scrollHeight + 600 + 'px' : '0';
    chevron.style.transform = _brandPrefsOpen ? 'rotate(90deg)' : '';
}

/* =========================================================
   FEATURE TOUR
   ========================================================= */
const TOUR_STEPS = [
    {
        target: 'tourGraphEl',
        title: 'Your nicotine curve',
        body: "The heart of Pulse. It shows how much nicotine is active right now, decaying in real time. Each green dot is a logged intake. <strong>Tap to expand</strong> — then drag your finger across the expanded graph to scrub any point in time and see the exact mg level.",
        screen: 'home',
    },
    {
        target: 'tourMetricsEl',
        title: 'The metric tiles',
        body: "<strong>Saturation</strong> — the fluid-fill tile shows what % of your peak is currently active. <strong>Clear in</strong> — when it drops near zero and cravings are most likely. <strong>Dopamine</strong> — where you are in the cycle: elevated, settling, recovering, or baseline.",
        screen: 'home',
    },
    {
        target: 'tourQuickLogEl',
        title: 'One-tap logging',
        body: "Pick your product and tap <strong>Log intake</strong> — the curve updates instantly. Use <strong>Plan next intake</strong> below to set a gap goal that appears as a marker on the graph. For trigger, mood, and brand detail, use the full Log tab.",
        screen: 'home',
    },
    {
        target: 'bioLockable',
        title: 'Body signal estimates',
        body: "Pulse estimates HRV, resting heart rate, SpO₂, stress, steps, and sleep quality from your intake pattern. Tap <em>Okay, I understand</em> to reveal them. <strong>Swipe the card strip left</strong> to see all signals. Connect a wearable in Settings for real readings.",
        screen: 'home',
    },
    {
        target: 'caffeineCard',
        title: 'Caffeine interaction',
        body: "When your saturation drops below 25%, Pulse shows a caffeine warning. Nicotine withdrawal and caffeine sensitivity feel identical — jitteriness, restlessness, irritability. Nicotine also makes caffeine metabolise ~40% faster, so the same coffee hits harder as you use less.",
        screen: 'home',
    },
    {
        target: 'tourCraveEl',
        title: 'The craving timer',
        body: "When an urge hits, start the 10-minute countdown. Most cravings peak and pass within that window. Your commitment note and accountability partner name both appear here — a reminder of your own reasons, in your own words.",
        screen: 'log',
    },
    {
        target: 'streakCard',
        title: 'Resilience grid',
        body: "Each square is one day over the last 28. Green = no logged intake. Amber = had intakes. The percentage shows how many days this month were clean — framed as honest progress, not a streak to break.",
        screen: 'stats',
    },
    {
        target: 'recoveryRingsCard',
        title: 'Body recovery rings',
        body: "<strong>CO Cleared</strong> — carbon monoxide from combustibles takes ~8 hours. <strong>HRV Recover</strong> — your nervous system takes ~24 hours to normalise. <strong>Circulation</strong> — full improvement takes ~2 weeks. Each ring counts from your last intake.",
        screen: 'stats',
    },
];
let _tourStep = 0;

function openTour() {
    switchScreen('home');
    _tourStep = 0;
    setTimeout(() => {
        const ov = document.getElementById('tourOverlay');
        if (ov) { ov.classList.add('show'); renderTourStep(); }
    }, 320);
}

function closeTour() {
    document.getElementById('tourOverlay').classList.remove('show');
    state.tourSeen = true;
}

function tourNext() {
    _tourStep++;
    if (_tourStep >= TOUR_STEPS.length) { closeTour(); return; }
    renderTourStep();
}

function tourBack() {
    if (_tourStep === 0) return;
    _tourStep--;
    renderTourStep();
}

function renderTourStep() {
    const step = TOUR_STEPS[_tourStep];
    const total = TOUR_STEPS.length;

    const targetScreen = step.screen || 'home';
    const currentActive = document.querySelector('.screen.active');
    const currentScreenId = currentActive ? currentActive.id.replace('screen-', '') : 'home';
    if (currentScreenId !== targetScreen) {
        switchScreen(targetScreen);
        setTimeout(() => _doRenderTourStep(step, total), 250);
        return;
    }
    _doRenderTourStep(step, total);
}

function _doRenderTourStep(step, total) {
    document.getElementById('tourStepTag').textContent = `Step ${_tourStep + 1} of ${total}`;
    document.getElementById('tourTitle').textContent = step.title;
    document.getElementById('tourBody').innerHTML = step.body;
    document.getElementById('tourNextBtn').textContent = _tourStep === total - 1 ? 'Done' : 'Next';

    const backBtn = document.getElementById('tourBackBtn');
    if (backBtn) backBtn.disabled = _tourStep === 0;

    const dots = document.getElementById('tourDots');
    dots.innerHTML = TOUR_STEPS.map((_, i) => `<div class="tour-dot ${i === _tourStep ? 'on' : ''}"></div>`).join('');

    const targetEl = document.getElementById(step.target);
    const spotlight = document.getElementById('tourSpotlight');
    const card = document.getElementById('tourCard');
    const appRect = document.querySelector('.app-area').getBoundingClientRect();

    if (targetEl) {
        const r = targetEl.getBoundingClientRect();
        const pad = 7;
        spotlight.style.left = (r.left - appRect.left - pad) + 'px';
        spotlight.style.top = (r.top - appRect.top - pad) + 'px';
        spotlight.style.width = (r.width + pad * 2) + 'px';
        spotlight.style.height = (r.height + pad * 2) + 'px';

        const cardH = 230, margin = 14;
        const spotBottom = (r.top - appRect.top) + r.height + pad;
        const appH = appRect.height;
        let cardTop;
        if (spotBottom + cardH + margin < appH) {
            cardTop = spotBottom + margin;
        } else {
            cardTop = (r.top - appRect.top) - pad - cardH - margin;
        }
        const cardLeft = Math.max(10, Math.min((r.left - appRect.left), appRect.width - 280 - 10));
        card.style.top = Math.max(8, cardTop) + 'px';
        card.style.left = cardLeft + 'px';
    }
}

/* =========================================================
   TIME
   ========================================================= */
function updateTime() {
    const n = new Date();
    const h = n.getHours().toString().padStart(2, '0'), m = n.getMinutes().toString().padStart(2, '0');
    document.getElementById('statusTime').textContent = `${h}:${m}`;
}

/* =========================================================
   MODALS
   ========================================================= */
function openModal(id) {
    document.getElementById(id === 'research' ? 'researchModal' : id === 'glossary' ? 'glossaryModal' : 'disclaimerModal').classList.add('show');
}
function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}
function closeModalOutside(e, id) {
    if (e.target === e.currentTarget) closeModal(id);
}

/* =========================================================
   STAGE 2 — SCRUBBABLE GRAPH
   ========================================================= */
function initExpandedGraphScrub() {
    const wrap = document.querySelector('.graph-ov-canvas-wrap');
    if (!wrap || wrap._scrubInit) return;
    wrap._scrubInit = true;

    const cursor = document.getElementById('scrubCursor');
    const bubble = document.getElementById('scrubBubble');

    function updateScrub(clientX) {
        if (!cursor || !bubble) return;
        const isMultiDay = state.graphRange === '7d' || state.graphRange === '30d';
        if (isMultiDay) { cursor.style.display = 'none'; return; }

        const rect = wrap.getBoundingClientRect();
        const pixelX = clientX - rect.left + wrap.scrollLeft;
        const rangeMs = { '4h': 4, '12h': 12, '24h': 24 }[state.graphRange] * 3600000;
        const overlayEl = document.getElementById('graphOverlay');
        const viewW = overlayEl ? overlayEl.clientWidth : 380;
        const canvas = document.getElementById('expandedGraph');
        const canvasW = canvas ? canvas.offsetWidth : viewW;
        const padL = 44, padR = 18;
        const W = canvasW - padL - padR;
        const { winStart, winEnd } = getStrictWindow(rangeMs);
        const winSpan = winEnd - winStart;

        const t = winStart + ((pixelX - padL) / W) * winSpan;
        if (pixelX < padL || pixelX > padL + W) { cursor.style.display = 'none'; return; }

        const mgAtT = Math.max(0, satAt(t, state.intakes));
        const pctAtT = Math.min(mgAtT / SAT_MAX * 100, 100);
        const d = new Date(t);
        const isFuture = t > Date.now();
        const timeStr = d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');

        cursor.style.display = 'block';
        cursor.style.left = pixelX + 'px';

        const bubbleRight = pixelX > canvasW * 0.55;
        bubble.style.left = bubbleRight ? 'auto' : '10px';
        bubble.style.right = bubbleRight ? '10px' : 'auto';
        bubble.innerHTML = `
            <div class="scrub-time">${timeStr}${isFuture ? ' · projected' : ''}</div>
            <div class="scrub-mg">${mgAtT.toFixed(2)}<span style="font-size:.5rem;opacity:.6">mg</span></div>
            <div class="scrub-pct">${pctAtT.toFixed(0)}% sat</div>
        `;
    }

    function hideScrub() { if (cursor) cursor.style.display = 'none'; }

    wrap.addEventListener('touchstart', (e) => updateScrub(e.touches[0].clientX), { passive: true });
    wrap.addEventListener('touchmove', (e) => { e.preventDefault(); updateScrub(e.touches[0].clientX); }, { passive: false });
    wrap.addEventListener('touchend', hideScrub);
    wrap.addEventListener('mousemove', (e) => updateScrub(e.clientX));
    wrap.addEventListener('mouseleave', hideScrub);
}

/* =========================================================
   STAGE 2 — LOCAL PUSH NOTIFICATIONS
   ========================================================= */
let _lastLowSatNotif = 0;

function requestNotificationPermission() {
    if (!('Notification' in window)) {
        const toast = document.getElementById('logToast');
        if (toast) { toast.textContent = 'Notifications not supported in this browser'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500); }
        return;
    }
    Notification.requestPermission().then(perm => {
        const toast = document.getElementById('logToast');
        if (!toast) return;
        toast.textContent = perm === 'granted'
            ? 'Notifications on — Pulse will warn you before craving windows'
            : 'Notifications declined · you can enable in browser settings';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
        const btn = document.getElementById('notifPermBtn');
        if (btn) renderNotifPermButton();
    });
}
window.requestNotificationPermission = requestNotificationPermission;

function renderNotifPermButton() {
    const btn = document.getElementById('notifPermBtn');
    if (!btn || !('Notification' in window)) return;
    const perm = Notification.permission;
    if (perm === 'granted') {
        btn.textContent = 'Enabled ✓';
        btn.disabled = true;
        btn.style.background = 'var(--sage-bg)';
        btn.style.color = 'var(--sage)';
        btn.style.borderColor = 'var(--sage-border)';
    } else if (perm === 'denied') {
        btn.textContent = 'Blocked in browser';
        btn.disabled = true;
        btn.style.opacity = '.5';
    }
}

function maybeFireSaturationAlert(satPct) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    const notifToggle = document.getElementById('satNotifToggle');
    if (notifToggle && !notifToggle.checked) return;
    const now = Date.now();
    if (satPct <= 15 && satPct > 1 && state.intakes.length > 0) {
        if (now - _lastLowSatNotif > 40 * 60000) {
            _lastLowSatNotif = now;
            try {
                new Notification('Pulse — craving window opening', {
                    body: `Nicotine is at ${satPct.toFixed(0)}%. Your body will signal in the next 20–30 minutes.`,
                    tag: 'pulse-low-sat',
                    silent: true
                });
            } catch (e) { }
        }
    }
}

/* =========================================================
   STAGE 2 — CAFFEINE INTERACTION
   ========================================================= */
function updateCaffeineCard(satPct) {
    const card = document.getElementById('caffeineCard');
    if (!card || state._caffeineCardDismissed) return;
    const recentIntake = state.intakes.some(i => Date.now() - i.time < 8 * 3600000);
    const shouldShow = satPct < 25 && satPct > 2 && recentIntake;
    card.style.display = shouldShow ? '' : 'none';
}

/* =========================================================
   STAGE 2 — ACCOUNTABILITY PARTNER
   ========================================================= */
function updateAccountabilityPartner() {
    const input = document.getElementById('partnerNameInput');
    if (input) {
        const saved = localStorage.getItem('pulse_partner_name') || '';
        input.value = saved;
    }
}

/* =========================================================
   INIT
   ========================================================= */
window.addEventListener('load', () => {
    updateTime();
    setInterval(updateTime, 15000);
    setInterval(() => { drawGraph(); }, 2000);
    renderQL();
    renderLogScreen();
    initHomeScroll();
    initScreenScroll('statsScroll', 'statsTitleEl');
    initScreenScroll('historyScroll', 'historyTitleEl');
    initScreenScroll('settingsScroll', 'settingsTitleEl');
    initScreenScroll('logScroll', 'logTitleEl');
    drawGraph();
    detectLocation();
    drawGraph();
    detectLocation();
    renderPfProdGrid();
    renderNotifPermButton();
    updateAccountabilityPartner();
});

let _pfSex = 'M';
function renderPfProdGrid() {
    const grid = document.getElementById('pfProdGrid');
    if (!grid) return;
    const products = [
        ['cigarette', 'Cigarette'],
        ['vape_pod', 'Vape'],
        ['cigar', 'Cigar'],
        ['pipe', 'Pipe'],
        ['gum', 'Gum / NRT'],
        ['pouch', 'Pouch'],
    ];
    grid.innerHTML = products.map(([key, label]) => {
        const p = P[key]; if (!p) return '';
        const isOn = key === (_pfPrimaryProduct || 'cigarette');
        return `<button class="pf-prod-btn${isOn ? ' on' : ''}" onclick="pfSetProd(this,'${key}')">
                    <div class="pf-prod-icon">${p.icon}</div>
                    <span>${label}</span>
                </button>`;
    }).join('');
}

let _pfPrimaryProduct = 'cigarette';
let _pfDailyFreq = '3-5';

function pfSetSex(btn, v) {
    _pfSex = v;
    document.querySelectorAll('#pfSexSeg .pf-seg-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    const show = v === 'F';
    el('pfCycleGroup').style.display = show ? '' : 'none';
    el('pfPeriodGroup').style.display = show ? '' : 'none';
    el('bCycleCard').style.display = show ? '' : 'none';
    el('bsgCycleRow').style.display = show ? '' : 'none';
}
function pfSetProd(btn, v) {
    _pfPrimaryProduct = v;
    document.querySelectorAll('#pfProdGrid .pf-prod-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
}
function pfSetFreq(btn, v) {
    _pfDailyFreq = v;
    document.querySelectorAll('#pfFreqSeg .pf-seg-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
}

/* =========================================================
   CYCLE PHASE
   ========================================================= */
function getCyclePhase() {
    const p = state.userProfile;
    if (p.sex !== 'F' || !p.lastPeriod) return null;
    const today = new Date().getDate();
    let day = today - p.lastPeriod;
    if (day < 0) day += 30;
    day = ((day % p.cycleLength) + p.cycleLength) % p.cycleLength + 1;
    if (day <= 5) return { phase: 'Menstrual', day, mult: 0.95, color: 'warn' };
    if (day <= 13) return { phase: 'Follicular', day, mult: 1.15, color: 'sage' };
    if (day <= 16) return { phase: 'Ovulation', day, mult: 1.18, color: 'sage' };
    return { phase: 'Luteal', day, mult: 0.92, color: 'amber' };
}

/* =========================================================
   BIOMETRIC SIMULATION
   ========================================================= */
let _bioSampleTime = 0;
let _bioStable = null;

function simulateBiometrics() {
    const b = state.biometrics;
    const now = Date.now();
    const sat = satAt(now, state.intakes);
    const satPct = Math.min(sat / SAT_MAX * 100, 100);
    const hasCombustible = state.intakes.some(i => P[i.product]?.combustible && now - i.time < 3600000);

    if (!_bioStable || now - _bioSampleTime > 30000) {
        _bioSampleTime = now;
        const hrvBase = 55 - (state.userProfile.age > 40 ? 8 : 0);
        _bioStable = {
            hrv: Math.max(18, Math.round(hrvBase - satPct * 0.28 + (Math.random() - 0.5) * 3)),
            rhr: Math.round(62 + satPct * 0.18 + (Math.random() - 0.5) * 1.5),
            spo2: +(98.5 - (hasCombustible ? 1.8 : 0) - Math.random() * 0.3).toFixed(1),
            stress: Math.round(Math.max(5, Math.min(95, 100 - (Math.max(18, Math.round(hrvBase - satPct * 0.28))) * 1.4 + satPct * 0.3))),
            respiratoryRate: +(14.5 + satPct * 0.04 + (Math.random() - 0.5) * 0.5).toFixed(1),
            steps: Math.round(new Date().getHours() * 520 + Math.random() * 350),
        };
    }

    b.hrv = _bioStable.hrv;
    b.rhr = _bioStable.rhr;
    b.spo2 = _bioStable.spo2;
    b.stress = _bioStable.stress;
    b.respiratoryRate = _bioStable.respiratoryRate;
    b.steps = _bioStable.steps;

    if (b.sleepScore === null) {
        const lateIntake = state.intakes.some(i => { const h = new Date(i.time).getHours(); return h >= 21 || h <= 1; });
        b.sleepScore = Math.round((lateIntake ? 62 : 78) + (Math.random() - 0.5) * 10);
        b.sleepEnd = '07:' + String(Math.floor(Math.random() * 30 + 10)).padStart(2, '0');
    }

    b.lastUpdated = now;
    b.simulated = true;

    if (b.steps > 8000) {
        el('activeMetaBadge').style.display = 'flex';
        window._exerciseK = K * 1.35;
    } else {
        el('activeMetaBadge').style.display = 'none';
        window._exerciseK = null;
    }
}

/* =========================================================
   RENDER BIOMETRICS TO UI
   ========================================================= */
function updateBiometrics() {
    if (!state.onboarded) return;
    simulateBiometrics();
    const b = state.biometrics;

    document.getElementById('bRhr').textContent = b.rhr;
    document.getElementById('bRhr').className = 'bio-val ' + (b.rhr > 80 ? 'amber' : '');

    const spo2El = document.getElementById('bSpo2');
    spo2El.textContent = b.spo2;
    spo2El.className = 'bio-val ' + (b.spo2 < 95 ? 'warn' : b.spo2 < 97 ? 'amber' : 'sage');

    document.getElementById('bStress').textContent = b.stress;
    document.getElementById('bStress').className = 'bio-val ' + (b.stress > 60 ? 'warn' : b.stress > 35 ? 'amber' : 'sage');

    document.getElementById('bResp').textContent = b.respiratoryRate;
    const bHrv = document.getElementById('bHrv');
    if (bHrv) {
        bHrv.textContent = b.hrv ?? '—';
        bHrv.className = 'bio-val ' + (b.hrv < 30 ? 'warn' : b.hrv < 45 ? 'amber' : 'sage');
    }
    const bSteps = document.getElementById('bSteps');
    if (bSteps) {
        bSteps.textContent = b.steps ? (b.steps >= 1000 ? (b.steps / 1000).toFixed(1) + 'k' : b.steps) : '—';
        bSteps.className = 'bio-val ' + (b.steps >= 8000 ? 'sage' : b.steps >= 5000 ? 'amber' : '');
    }
    const bSleep = document.getElementById('bSleep');
    if (bSleep) {
        bSleep.textContent = b.sleepScore ?? '—';
        bSleep.className = 'bio-val ' + (b.sleepScore >= 75 ? 'sage' : b.sleepScore >= 60 ? 'amber' : 'warn');
    }

    const hrvEl = document.getElementById('mHrv');
    if (hrvEl) { hrvEl.textContent = b.hrv; hrvEl.className = 'met-val ' + (b.hrv < 30 ? 'warn' : b.hrv < 45 ? 'amber' : 'sage'); }

    const cp = getCyclePhase();
    if (cp && state.userProfile.sex === 'F') {
        el('bCycleCard').style.display = '';
        document.getElementById('bCycle').textContent = 'Day ' + cp.day;
        document.getElementById('bCycleUnit').textContent = cp.phase;
        document.getElementById('bCycle').className = 'bio-val ' + cp.color;
        el('bsgCycleRow').style.display = '';
        const cycleHL = (Math.LN2 / K) / cp.mult;
        window._cycleK = Math.LN2 / cycleHL;
    }

    const sleepCard = document.getElementById('sleepCard');
    if (b.sleepScore !== null && sleepCard) {
        sleepCard.style.display = '';
        document.getElementById('sleepBadge').textContent = b.sleepScore + ' / 100';
        document.getElementById('sleepBadge').className = 'sleep-badge ' + (b.sleepScore < 65 ? 'warn' : b.sleepScore < 75 ? 'amber' : 'sage');
        const lateIntake = state.intakes.some(i => { const h = new Date(i.time).getHours(); return h >= 21 || h <= 1; });
        document.getElementById('sleepBody').textContent = lateIntake
            ? 'Late intake detected — may have reduced REM sleep'
            : 'No late-night intake · sleep unaffected';
    }

    document.getElementById('bsgHrv').textContent = b.hrv + ' ms';
    document.getElementById('bsgRhr').textContent = b.rhr + ' bpm';
    el('bsgRhrBar').style.width = Math.min(b.rhr / 100 * 100, 100) + '%';
    document.getElementById('bsgSpo2').textContent = b.spo2 + '%';
    el('bsgSpo2Bar').style.width = b.spo2 + '%';
    el('bsgSpo2Bar').className = 'bsg-bar-fill ' + (b.spo2 < 95 ? 'warn' : 'sage');
    document.getElementById('bsgStress').textContent = b.stress;
    el('bsgStressBar').style.width = b.stress + '%';
    document.getElementById('bsgResp').textContent = b.respiratoryRate + ' br/min';
    el('bsgRespBar').style.width = Math.min(b.respiratoryRate / 30 * 100, 100) + '%';

    if (b.sleepScore !== null) {
        el('sleepImpactCard').style.display = '';
        document.getElementById('sleepIcVal').textContent = b.sleepScore;
        const lateI = state.intakes.some(i => { const h = new Date(i.time).getHours(); return h >= 21 || h <= 1; });
        document.getElementById('sleepIcSub').textContent = lateI
            ? 'A late-night intake may have suppressed REM sleep. Try logging before 9 PM.'
            : 'No late-night intake logged. Sleep quality unaffected by nicotine.';
    }

    if (cp && state.userProfile.sex === 'F') {
        const phases = [
            { n: 'Mens.', days: '1–5', active: cp.phase === 'Menstrual' },
            { n: 'Follic.', days: '6–13', active: cp.phase === 'Follicular' },
            { n: 'Ovul.', days: '14–16', active: cp.phase === 'Ovulation' },
            { n: 'Luteal', days: '17–28', active: cp.phase === 'Luteal' },
        ];
        document.getElementById('bsgCyclePhases').innerHTML = phases.map(p =>
            `<div class="bsg-phase ${p.active ? 'on' : ''}"><div>${p.n}</div><div class="bsg-phase-days">${p.days}</div></div>`
        ).join('');
    }

    drawHrvSparkline();
}

function drawHrvSparkline() {
    const canvas = document.getElementById('hrvSparkline');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const b = state.biometrics;
    const sat = satAt(Date.now(), state.intakes);
    const satPct = Math.min(sat / SAT_MAX * 100, 100);

    const base = 55 - (state.userProfile.age > 40 ? 8 : 0);
    const seed = Math.floor(Date.now() / 86400000);
    const seededRand = (n) => {
        const x = Math.sin(seed * 9301 + n * 49297 + 233) * 10000;
        return x - Math.floor(x);
    };
    const vals = Array.from({ length: 7 }, (_, i) => {
        const noise = (seededRand(i) - 0.5) * 8;
        const satEffect = i === 6 ? -satPct * 0.18 : 0;
        return Math.max(22, base + noise + satEffect);
    });

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const min = Math.min(...vals) - 3, max = Math.max(...vals) + 3;
    const isDark = state.darkMode;
    const sageColor = isDark ? 'rgba(90,156,143,.85)' : 'rgba(74,124,111,.85)';

    ctx.beginPath();
    vals.forEach((v, i) => {
        const x = i / (vals.length - 1) * w;
        const y = h - (v - min) / (max - min) * h;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = sageColor;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    const lastX = w, lastY = h - (vals[6] - min) / (max - min) * h;
    ctx.beginPath(); ctx.arc(lastX, lastY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = sageColor; ctx.fill();
}

function openSetSub(id) {
    document.getElementById(id).classList.add('open');
    updateLogPill('settings-sub', 0);
}
window.saveCommitment = function () {
    const txt = document.getElementById('commitmentText').value.trim();
    if (txt) localStorage.setItem('pulse_commitment', txt);
    finishOnboarding();
    applyMode();
};
function onbCheckScroll() {
    const el = document.getElementById('onbDisclaimerScroll');
    const hint = document.getElementById('onbScrollHint');
    const confirm = document.getElementById('onbDisclaimerConfirm');
    if (!el) return;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40;
    if (nearBottom) {
        if (hint) hint.style.display = 'none';
        if (confirm) confirm.classList.add('visible');
    }
}

function onbCheckReady() {
    const cb = document.getElementById('onbDisclaimerCb');
    const btn = document.getElementById('onbDisclaimerBtn');
    if (!cb || !btn) return;
    btn.disabled = !cb.checked;
    btn.style.opacity = cb.checked ? '1' : '0.38';
    btn.style.cursor = cb.checked ? 'pointer' : 'not-allowed';
}

function closeSetSub(id) {
    document.getElementById(id).classList.remove('open');
    const anyOpen = document.querySelectorAll('.set-sub-screen.open').length > 0;
    if (!anyOpen) updateLogPill('settings', 0);
}
function updateBioPoll(mins) {
    if (window._bioPollInterval) clearInterval(window._bioPollInterval);
    window._bioPollInterval = setInterval(() => {
        if (state.onboarded) {
            updateBiometrics();
            showBioDeltaToast();
        }
    }, mins * 60 * 1000);
}
function showBioDeltaToast() {
    const b = state.biometrics;
    if (!b.lastUpdated) return;
    const prev = window._lastBioSnapshot || {};

    function setDelta(elId, curr, prevVal, invertSign) {
        const el = document.getElementById(elId);
        if (!el || curr == null || prevVal == null) return;
        const diff = curr - prevVal;
        const threshold = elId === 'dSpo2' ? 0.2 : elId === 'dHrv' ? 2 : 2;
        if (Math.abs(diff) < threshold) { el.textContent = ''; el.className = 'bio-delta'; return; }
        const isGood = invertSign ? diff < 0 : diff > 0;
        const arrow = diff > 0 ? '↑' : '↓';
        const absStr = Math.abs(elId === 'dSpo2' ? +diff.toFixed(1) : Math.round(diff));
        el.textContent = arrow + absStr;
        el.className = 'bio-delta ' + (isGood ? 'down' : 'up');
    }
    setDelta('dRhr', b.rhr, prev.rhr, true);
    setDelta('dSpo2', b.spo2, prev.spo2, false);
    setDelta('dStress', b.stress, prev.stress, true);
    setDelta('dHrv', b.hrv, prev.hrv, false);

    const lines = [];
    if (prev.hrv && Math.abs(b.hrv - prev.hrv) >= 3) lines.push(`HRV ${b.hrv > prev.hrv ? '↑' : '↓'}${Math.abs(b.hrv - prev.hrv)}ms`);
    if (prev.stress && Math.abs(b.stress - prev.stress) >= 4) lines.push(`Stress ${b.stress > prev.stress ? '↑' : '↓'}${Math.abs(b.stress - prev.stress)}`);
    if (prev.spo2 && Math.abs(b.spo2 - prev.spo2) >= 0.3) lines.push(`SpO₂ ${b.spo2 > prev.spo2 ? '↑' : '↓'}${Math.abs((b.spo2 - prev.spo2).toFixed(1))}%`);

    const updEl = document.getElementById('bioUpdatedTime');
    if (updEl) {
        const mins = Math.round((Date.now() - b.lastUpdated) / 60000);
        updEl.textContent = mins < 1 ? 'just now' : mins < 60 ? mins + 'm ago' : Math.round(mins / 60) + 'h ago';
    }

    window._lastBioSnapshot = { hrv: b.hrv, stress: b.stress, spo2: b.spo2, rhr: b.rhr };
    if (lines.length === 0) return;
    const t = document.getElementById('logToast');
    if (t) { t.textContent = lines.join(' · '); t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000); }
}
updateBioPoll(20);

/* ── FLUID SATURATION CANVAS ── */
(function () {
    let _phase1 = 0, _phase2 = 0, _fill = 0, _target = 0, _raf = null, _running = false;

    function lerp3(t, a, b, c) {
        if (t < 0.5) { const f = t * 2; return a.map((v, i) => v + (b[i] - v) * f); }
        const f = (t - 0.5) * 2; return b.map((v, i) => v + (c[i] - v) * f);
    }

    function frame() {
        _raf = null;
        const canvas = document.getElementById('satFluidCanvas');
        if (!canvas) { _running = false; return; }
        const par = canvas.parentElement;
        const W = par.offsetWidth, H = par.offsetHeight;
        if (!W || !H) { _raf = requestAnimationFrame(frame); return; }
        const dpr = devicePixelRatio || 1;
        if (canvas.width !== Math.round(W * dpr)) {
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
        }
        const ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);

        _fill += (_target - _fill) * 0.05;
        const t = Math.max(0, Math.min(1, _fill));
        const [r, g, b] = lerp3(t, [100, 185, 225], [80, 160, 120], [210, 105, 45]);

        const bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, `rgba(${r},${g},${b},${t < 0.02 ? 0.04 : 0.07})`);
        bg.addColorStop(1, `rgba(${r},${g},${b},${t < 0.02 ? 0.07 : 0.12})`);
        ctx.fillStyle = bg;
        ctx.beginPath(); ctx.roundRect(0, 0, W, H, 10); ctx.fill();

        const lbl = document.getElementById('satLbl');
        const val = document.getElementById('mSat');
        const unt = document.getElementById('satUnit');
        const darkMode = document.body.classList.contains('dark');
        if (t > 0.05) {
            const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            const useWhite = darkMode || L < 0.50;
            const txtColor = useWhite ? 'rgba(255,255,255,0.97)' : 'rgba(18,14,10,0.92)';
            const subColor = useWhite ? 'rgba(255,255,255,0.70)' : 'rgba(18,14,10,0.56)';
            const valShadow = useWhite ? '0 1px 5px rgba(0,0,0,0.35)' : '0 1px 3px rgba(255,255,255,0.6)';
            if (lbl) { lbl.style.color = subColor; lbl.style.textShadow = ''; }
            if (unt) { unt.style.color = subColor; unt.style.textShadow = ''; }
            if (val) { val.style.color = txtColor; val.style.textShadow = valShadow; }
        } else {
            const emptyTxt = darkMode ? 'rgba(240,237,232,0.92)' : '';
            const emptySub = darkMode ? 'rgba(240,237,232,0.55)' : '';
            [lbl, unt].forEach(e => { if (e) { e.style.color = emptySub; e.style.textShadow = ''; } });
            if (val) { val.style.color = emptyTxt; val.style.textShadow = ''; }
        }

        if (t < 0.01) {
            _phase1 += 0.008; _phase2 += 0.005;
            const rippleY = H - 3;
            ctx.beginPath();
            for (let x = 0; x <= W; x++) {
                const w = Math.sin((x / W) * Math.PI * 3 + _phase1) * 1.5;
                x === 0 ? ctx.moveTo(x, rippleY + w) : ctx.lineTo(x, rippleY + w);
            }
            ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
            ctx.fillStyle = `rgba(${r},${g},${b},0.18)`; ctx.fill();
            _raf = requestAnimationFrame(frame); return;
        }

        _phase1 += 0.022; _phase2 += 0.015;
        const fillY = H * (1 - t);

        ctx.beginPath();
        for (let x = 0; x <= W; x++) {
            const w = Math.sin((x / W) * Math.PI * 2.5 + _phase1) * H * 0.028
                + Math.sin((x / W) * Math.PI * 4.2 + _phase2) * H * 0.012;
            x === 0 ? ctx.moveTo(x, fillY + w) : ctx.lineTo(x, fillY + w);
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
        const gr = ctx.createLinearGradient(0, fillY, 0, H);
        gr.addColorStop(0, `rgba(${r},${g},${b},0.5)`);
        gr.addColorStop(0.5, `rgba(${r},${g},${b},0.78)`);
        gr.addColorStop(1, `rgba(${r},${g},${b},0.95)`);
        ctx.fillStyle = gr; ctx.fill();

        ctx.beginPath();
        for (let x = 0; x <= W; x++) {
            const w = Math.sin((x / W) * Math.PI * 2.5 + _phase1) * H * 0.028
                + Math.sin((x / W) * Math.PI * 4.2 + _phase2) * H * 0.012;
            x === 0 ? ctx.moveTo(x, fillY + w) : ctx.lineTo(x, fillY + w);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1.2; ctx.stroke();

        _raf = requestAnimationFrame(frame);
    }

    window.setSatFluid = function (pct) {
        _target = Math.max(0, Math.min(1, pct / 100));
        if (!_raf) { _running = true; _raf = requestAnimationFrame(frame); }
    };

    window.addEventListener('load', () => { _raf = requestAnimationFrame(frame); });
})();


/* ═══════════════════════════════════════════════
   RECOVERY RINGS
   ═══════════════════════════════════════════════ */
function renderRecoveryRings() {
    const container = document.getElementById('recoveryRingsCard');
    if (!container) return;

    const now = Date.now();

    const lastAny = state.intakes.length > 0
        ? Math.max(...state.intakes.map(i => i.time))
        : null;

    const combustibleLogs = state.intakes.filter(l => P[l.product]?.combustible);
    const lastCombustible = combustibleLogs.length > 0
        ? Math.max(...combustibleLogs.map(l => l.time))
        : null;

    const minutesSinceAny = lastAny ? (now - lastAny) / 60000 : 0;
    const minutesSinceCO = lastCombustible ? (now - lastCombustible) / 60000 : 0;

    const rings = [
        {
            label: 'CO Cleared',
            sublabel: '~8 hr',
            fullAt: 480,
            minutesSince: minutesSinceCO,
            active: lastCombustible !== null,
            color: '#5a9c8f',
            icon: 'M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4',
        },
        {
            label: 'HRV Recover',
            sublabel: '~24 hr',
            fullAt: 1440,
            minutesSince: minutesSinceAny,
            active: lastAny !== null,
            color: '#9a6a2a',
            icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
        },
        {
            label: 'Circulation',
            sublabel: '~2 wk',
            fullAt: 20160,
            minutesSince: minutesSinceAny,
            active: lastAny !== null,
            color: '#3a7abf',
            icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        },
    ];

    const size = 68;
    const stroke = 5;
    const r = (size / 2) - stroke;
    const circ = 2 * Math.PI * r;

    container.innerHTML = rings.map(ring => {
        const pct = ring.active ? Math.min(ring.minutesSince / ring.fullAt, 1) : 0;
        const dash = circ * pct;
        const gap = circ - dash;
        const pctDisplay = Math.round(pct * 100);
        const dimColor = ring.active ? ring.color : 'var(--ink-faint)';

        return `
        <div class="recovery-ring-item">
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
                <circle cx="${size / 2}" cy="${size / 2}" r="${r}"
                    fill="none" stroke="var(--bg-inset)" stroke-width="${stroke}"/>
                <circle cx="${size / 2}" cy="${size / 2}" r="${r}"
                    fill="none" stroke="${dimColor}" stroke-width="${stroke}"
                    stroke-linecap="round"
                    stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}"
                    stroke-dashoffset="${(circ * 0.25).toFixed(1)}"
                    style="transition:stroke-dasharray 1.2s cubic-bezier(.25,.46,.45,.94)"/>
                <svg x="${size / 2 - 7}" y="${size / 2 - 7}" width="14" height="14"
                    viewBox="0 0 24 24" fill="none" stroke="${dimColor}" stroke-width="2">
                    <path d="${ring.icon}"/>
                </svg>
            </svg>
            <div class="recovery-ring-label">${ring.label}</div>
            <div class="recovery-ring-pct" style="color:${dimColor}">${ring.active ? pctDisplay + '%' : '—'}</div>
            <div class="recovery-ring-sub">${ring.sublabel}</div>
        </div>`;
    }).join('');
}

function startTour() {
    switchScreen('home');
    setTimeout(() => {
        _tourStep = 0;
        const ov = document.getElementById('tourOverlay');
        if (ov) {
            ov.style.display = 'flex';
            ov.classList.add('show');
            renderTourStep();
        } else {
            const onb = document.getElementById('onbDisclaimer');
            if (onb) onb.classList.add('show');
        }
    }, 400);
}
window.startTour = startTour;
