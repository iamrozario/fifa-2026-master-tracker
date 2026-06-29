// tournament-engine.js
// FIFA World Cup 2026 Master Engine - V8 (Timezone Engine Active)

// ==========================================
// MODULE 1 & 2: MEMORY & DATA DICTIONARY
// ==========================================

const STORAGE_KEY = 'fifa_journal_offline_state';
const nationHTML = {}; 

let tournamentData = {
    inputs: {},
    theme: 'dark',
    matchStats: {} 
};

const TOURNAMENT_GROUPS = {
    'A': ['MEX', 'RSA', 'KOR', 'CZE'], 'B': ['CAN', 'BIH', 'QAT', 'SUI'],
    'C': ['BRA', 'MAR', 'HAI', 'SCO'], 'D': ['USA', 'PAR', 'AUS', 'TUR'],
    'E': ['GER', 'CUW', 'CIV', 'ECU'], 'F': ['NED', 'JPN', 'SWE', 'TUN'],
    'G': ['BEL', 'EGY', 'IRN', 'NZL'], 'H': ['ESP', 'CPV', 'KSA', 'URU'],
    'I': ['FRA', 'SEN', 'IRQ', 'NOR'], 'J': ['ARG', 'ALG', 'AUT', 'JOR'],
    'K': ['POR', 'COD', 'UZB', 'COL'], 'L': ['ENG', 'CRO', 'GHA', 'PAN']
};

const CORE_THEMES = [
    { id: 'classic', name: 'Classic Pitch' }, { id: 'neon', name: 'Cyberpunk Neon' },
    { id: 'dark', name: 'Dark Mode' }, { id: 'light', name: 'Light Mode' },
    { id: 'cyber', name: 'Midnight Cyber' }, { id: 'ocean', name: 'Oceanic Blue' },
    { id: 'gold', name: 'World Cup Gold' }
];

const NATION_THEMES = [
    { code: 'ALG', name: 'Algeria', c1: '#006233', c2: '#D21034' }, { code: 'ARG', name: 'Argentina', c1: '#43A1D5', c2: '#FFFFFF' },
    { code: 'AUS', name: 'Australia', c1: '#008751', c2: '#FFCD00' }, { code: 'AUT', name: 'Austria', c1: '#ED2939', c2: '#FFFFFF' },
    { code: 'BEL', name: 'Belgium', c1: '#E30613', c2: '#FFD900' }, { code: 'BIH', name: 'Bosnia & Herz.', c1: '#002F6C', c2: '#FFCD00' },
    { code: 'BRA', name: 'Brazil', c1: '#009C3B', c2: '#FFDF00' }, { code: 'CAN', name: 'Canada', c1: '#FF0000', c2: '#FFFFFF' },
    { code: 'CPV', name: 'Cabo Verde', c1: '#003893', c2: '#CF2027' }, { code: 'COL', name: 'Colombia', c1: '#FCD116', c2: '#003893' },
    { code: 'CIV', name: 'Côte d\'Ivoire', c1: '#F77F00', c2: '#009E60' }, { code: 'CRO', name: 'Croatia', c1: '#FF0000', c2: '#FFFFFF' },
    { code: 'CUW', name: 'Curaçao', c1: '#002B7F', c2: '#F9E814' }, { code: 'CZE', name: 'Czech Republic', c1: '#D7141A', c2: '#11457E' },
    { code: 'COD', name: 'DR Congo', c1: '#007FFF', c2: '#F7D618' }, { code: 'ECU', name: 'Ecuador', c1: '#FFD100', c2: '#0033A0' },
    { code: 'EGY', name: 'Egypt', c1: '#CE1126', c2: '#FFFFFF' }, { code: 'ENG', name: 'England', c1: '#CE1126', c2: '#FFFFFF' },
    { code: 'FRA', name: 'France', c1: '#002395', c2: '#ED2939' }, { code: 'GER', name: 'Germany', c1: '#FFFFFF', c2: '#FFCE00' },
    { code: 'GHA', name: 'Ghana', c1: '#006B3F', c2: '#FCD116' }, { code: 'HAI', name: 'Haiti', c1: '#00209F', c2: '#D21034' },
    { code: 'IRN', name: 'Iran', c1: '#239F40', c2: '#DA0000' }, { code: 'IRQ', name: 'Iraq', c1: '#CE1126', c2: '#007A3D' },
    { code: 'JPN', name: 'Japan', c1: '#000555', c2: '#ED2939' }, { code: 'JOR', name: 'Jordan', c1: '#CE1126', c2: '#007A3D' },
    { code: 'MEX', name: 'Mexico', c1: '#006341', c2: '#C60C30' }, { code: 'MAR', name: 'Morocco', c1: '#C1272D', c2: '#006233' },
    { code: 'NED', name: 'Netherlands', c1: '#F36C21', c2: '#21468B' }, { code: 'NZL', name: 'New Zealand', c1: '#FFFFFF', c2: '#000000' },
    { code: 'NOR', name: 'Norway', c1: '#BA0C2F', c2: '#00205B' }, { code: 'PAN', name: 'Panama', c1: '#C8102E', c2: '#002A8F' },
    { code: 'PAR', name: 'Paraguay', c1: '#D52B1E', c2: '#0038A8' }, { code: 'POR', name: 'Portugal', c1: '#046A38', c2: '#DA291C' },
    { code: 'QAT', name: 'Qatar', c1: '#8A1538', c2: '#FFFFFF' }, { code: 'KSA', name: 'Saudi Arabia', c1: '#006C35', c2: '#FFFFFF' },
    { code: 'SCO', name: 'Scotland', c1: '#005EB8', c2: '#FFFFFF' }, { code: 'SEN', name: 'Senegal', c1: '#00853F', c2: '#FDEF42' },
    { code: 'RSA', name: 'South Africa', c1: '#007749', c2: '#FFB81C' }, { code: 'KOR', name: 'South Korea', c1: '#0F64CD', c2: '#ED2939' },
    { code: 'ESP', name: 'Spain', c1: '#AA151B', c2: '#F1BF00' }, { code: 'SWE', name: 'Sweden', c1: '#006AA7', c2: '#FECC00' },
    { code: 'SUI', name: 'Switzerland', c1: '#FF0000', c2: '#FFFFFF' }, { code: 'TUN', name: 'Tunisia', c1: '#E70013', c2: '#FFFFFF' },
    { code: 'TUR', name: 'Turkey', c1: '#E30A17', c2: '#FFFFFF' }, { code: 'USA', name: 'USA', c1: '#0A3161', c2: '#B31942' },
    { code: 'URU', name: 'Uruguay', c1: '#0038A8', c2: '#FCD116' }, { code: 'UZB', name: 'Uzbekistan', c1: '#0099B5', c2: '#1EB53A' }
];

document.addEventListener('DOMContentLoaded', () => {
    forceBlackInputs(); 
    injectMissingInputs(); 
    cacheNationData(); 
    setupThemeSwitcher();
    injectModalSystem();
    fixTrackerPlaceholders();
    formatLocalTime();

    document.querySelectorAll('.knockout-wrapper .team-input, .knockout-wrapper .score-input-small').forEach(input => {
        input.setAttribute('readonly', 'true');
        input.style.pointerEvents = 'none'; // Kills the mouse cursor interaction
    });
    
    loadData();
    attachGlobalListeners();
    attachModalTriggers(); 
    setupKillSwitch(); 
    
    if (typeof calculateGroupStages === "function") calculateGroupStages(); 
    if (typeof calculateKnockouts === "function") calculateKnockouts(); 
});

// --- CORE INFRASTRUCTURE ---

// --- HARDCODED DUAL-TIMEZONE ENGINE ---
function formatLocalTime() {
    const rows = document.querySelectorAll('.match-tracker-wrapper tbody tr[data-time]');
    rows.forEach(row => {
        const isoString = row.getAttribute('data-time');
        if(!isoString) return;
        const dateObj = new Date(isoString);
        
        // Keep the date parsing, but abandon native time formatting
        const dateOpts = { day: '2-digit', month: 'short' };
        const dateStr = dateObj.toLocaleDateString(undefined, dateOpts);
        
        // Mathematically extract and parse the system local time
        let rawHours = dateObj.getHours();
        let rawMinutes = dateObj.getMinutes();
        
        let mins = rawMinutes < 10 ? '0' + rawMinutes : rawMinutes;
        let hrs24 = rawHours < 10 ? '0' + rawHours : rawHours;
        let ampm = rawHours >= 12 ? 'PM' : 'AM';
        let hrs12 = rawHours % 12 || 12; // Forces 0 to 12
        
        const time24Str = `${hrs24}:${mins}`;
        const time12Str = `${hrs12}:${mins} ${ampm}`;
        
        const dateCell = row.querySelector('.local-date');
        const timeCell = row.querySelector('.local-time');
        
        if (dateCell) dateCell.textContent = dateStr;
        if (timeCell) timeCell.innerHTML = `${time24Str} <span style="font-size:0.8em; color:var(--text-muted); font-weight:700;">(${time12Str})</span>`;
    });
    
    syncWallChart(); 
}

function forceBlackInputs() {
    if (!document.getElementById('forced-input-styles')) {
        const style = document.createElement('style');
        style.id = 'forced-input-styles';
        style.innerHTML = `input { color: #000 !important; background-color: #FFF !important; font-weight: bold !important; } input::placeholder { color: #666 !important; }`;
        document.head.appendChild(style);
    }
}

function injectMissingInputs() {
    document.querySelectorAll('.match-tracker-wrapper .score-box').forEach(box => {
        if (box.innerHTML.trim() === '') box.innerHTML = '<input type="number" min="0" step="1" inputmode="numeric" class="score-input" aria-label="Score">';
    });
}

function syncWallChart() {
    const trackerRows = document.querySelectorAll('.match-tracker-wrapper tbody tr');
    trackerRows.forEach(row => {
        const firstCell = row.querySelector('td');
        if (!firstCell) return;
        const matchId = firstCell.textContent.trim();
        const wallBox = document.querySelector(`.match-box[data-match-id="${matchId}"]`);

        if (wallBox) {
            const trackerInputs = row.querySelectorAll('.team-input');
            const wallInputs = wallBox.querySelectorAll('.team-input');
            
            // --- PATCHED SYNC ENGINE BLOCK ---
            
            if (trackerInputs.length === 2 && wallInputs.length === 2) {
                // Copy placeholders
                wallInputs[0].placeholder = trackerInputs[0].placeholder;
                wallInputs[1].placeholder = trackerInputs[1].placeholder;
                
                // Actively push user values to populate the visual bracket
                wallInputs[0].value = trackerInputs[0].value;
                wallInputs[1].value = trackerInputs[1].value;
            }

            // --- NEW: SYNCHRONIZE SCORES TO WALL CHART ---
            const trackerScores = row.querySelectorAll('.score-input');
            const wallScores = wallBox.querySelectorAll('.score-input-small');
            if (trackerScores.length === 2 && wallScores.length === 2) {
                wallScores[0].value = trackerScores[0].value;
                wallScores[1].value = trackerScores[1].value;
            }

            if (parseInt(matchId) >= 73 && parseInt(matchId) <= 104) {
                const dateCell = row.querySelector('.local-date');
                const timeCell = row.querySelector('.local-time');
                const venueCells = row.querySelectorAll('td');
                
                if (venueCells.length >= 6) {
                    const venueCell = venueCells[4]; 
                    const metaDiv = wallBox.querySelector('.match-meta');
                    const badge = row.querySelector('.knockout-badge');

                    if (metaDiv && dateCell && timeCell && venueCell && badge) {
                        metaDiv.innerHTML = `M${matchId} | ${badge.textContent} | <span class="local-date">${dateCell.innerHTML}</span> | <span class="local-time">${timeCell.innerHTML}</span> | ${venueCell.textContent}`;
                    }
                }
            }
        }
    });
}

function cacheNationData() {
    document.querySelectorAll('.groups-container tbody tr').forEach(tr => {
        const abbrSpan = tr.querySelector('.abbr');
        if(abbrSpan) nationHTML[abbrSpan.textContent.replace(/[\(\)]/g, '').trim()] = tr.querySelector('.nation-cell').innerHTML;
    });
}

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try { 
            tournamentData = JSON.parse(saved); 
            if (!tournamentData.matchStats) tournamentData.matchStats = {};
            applyTheme(); 
            restoreUI(); 
        } 
        catch (e) { localStorage.removeItem(STORAGE_KEY); }
    }
}

// --- UPGRADED MEMORY PIPELINE ---

function getStableInputKey(input, fallbackIndex) {
    // Skip the theme switcher dropdown entirely
    if (input.classList.contains('theme-switcher')) return null;
    
    // Hardcode safety for the Champion Input box
    if (input.id === 'championInput') return 'champion_input_final';

    // 1. Target Wall Chart inputs via their data-match-id
    const matchBox = input.closest('.match-box[data-match-id]');
    if (matchBox) {
        const matchId = matchBox.getAttribute('data-match-id');
        const inputsInBox = Array.from(matchBox.querySelectorAll('input'));
        return `wall_match_${matchId}_input_${inputsInBox.indexOf(input)}`;
    }

    // 2. Target Master Tracker inputs via the match ID in the first column
    const tr = input.closest('tr');
    if (tr && tr.firstElementChild) {
        const matchId = tr.firstElementChild.textContent.trim();
        if (!isNaN(parseInt(matchId))) {
            const inputsInRow = Array.from(tr.querySelectorAll('input'));
            return `tracker_match_${matchId}_input_${inputsInRow.indexOf(input)}`;
        }
    }

    // Failsafe for anything structurally unaccounted for
    return `fallback_index_${fallbackIndex}`;
}

function saveUI() {
    tournamentData.inputs = {};
    document.querySelectorAll('input:not(.theme-switcher)').forEach((input, index) => {
        const stableKey = getStableInputKey(input, index);
        if (stableKey) {
            tournamentData.inputs[stableKey] = input.value;
        }
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tournamentData));
}

function restoreUI() {
    document.querySelectorAll('input:not(.theme-switcher)').forEach((input, index) => {
        const stableKey = getStableInputKey(input, index);
        if (stableKey && tournamentData.inputs && tournamentData.inputs[stableKey] !== undefined) {
            input.value = tournamentData.inputs[stableKey];
        }
    });
}

function setupKillSwitch() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        if (btn.textContent.includes('Nuke Reset')) {
            btn.addEventListener('click', () => {
                if(confirm("BRUTAL WARNING: This will permanently delete all 104 match scores and summaries. Are you sure?")) {
                    localStorage.removeItem(STORAGE_KEY);
                    location.reload();
                }
            });
        }
    });
}

function attachGlobalListeners() {
    // 1. Your existing input listener for saving and calculating scores
    document.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT' && !e.target.classList.contains('theme-switcher')) {
            saveUI();
            if (e.target.classList.contains('score-input') || e.target.classList.contains('score-input-small')) {
                calculateGroupStages();
                calculateKnockouts();
            }
        }
    });

    // --- 2. NEW: DESKTOP DRAG-TO-SCROLL ---
    const slider = document.querySelector('.knockout-wrapper');
    let isDown = false; let startX; let scrollLeft;
    if(slider) {
        slider.addEventListener('mousedown', (e) => { isDown = true; slider.style.cursor = 'grabbing'; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
        slider.addEventListener('mouseleave', () => { isDown = false; slider.style.cursor = 'grab'; });
        slider.addEventListener('mouseup', () => { isDown = false; slider.style.cursor = 'grab'; });
        slider.addEventListener('mousemove', (e) => { 
            if(!isDown) return; 
            e.preventDefault(); 
            const x = e.pageX - slider.offsetLeft; 
            const walk = (x - startX) * 2; 
            slider.scrollLeft = scrollLeft - walk; 
        });
    }
}

// ==========================================
// MODULE 8 & 9: THE LEAN MODAL SYSTEM
// ==========================================

function injectModalSystem() {
    const style = document.createElement('style');
    style.innerHTML = `
        .match-modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; justify-content: center; align-items: center; backdrop-filter: blur(8px); }
        .match-modal { background: var(--surface); border: 1px solid var(--border-light); border-radius: 12px; width: 90%; max-width: 450px; padding: 25px; color: var(--text-main); box-shadow: 0 10px 40px rgba(0,0,0,0.7); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 15px; margin-bottom: 20px; }
        .modal-header h2 { margin: 0; font-size: 1.5rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-main); }
        .close-modal { background: none; border: none; color: var(--text-muted); font-size: 2rem; cursor: pointer; transition: 0.2s; line-height: 1; }
        .close-modal:hover { color: #FF003C; transform: scale(1.1); }
        .stat-group { margin-bottom: 15px; }
        .stat-group label { display: block; margin-bottom: 8px; color: var(--text-muted); font-weight: bold; font-size: 0.85rem; text-transform: uppercase; }
        .stat-group textarea { width: 100%; background: var(--bg-base); border: 1px solid var(--border-light); color: var(--text-main); padding: 12px; border-radius: 8px; resize: vertical; min-height: 70px; font-family: inherit; font-size: 1rem; }
        .stat-group textarea:focus { outline: none; border-color: var(--text-muted); box-shadow: 0 0 10px var(--grad-1); }
        .modal-save-btn { width: 100%; background: linear-gradient(90deg, var(--grad-1), var(--grad-2)); border: 1px solid var(--border-light); color: var(--text-main); padding: 15px; border-radius: 8px; font-weight: bold; font-size: 1rem; cursor: pointer; transition: 0.3s; margin-top: 10px; text-transform: uppercase; letter-spacing: 1px; }
        .modal-save-btn:hover { filter: brightness(1.3); }
    `;
    document.head.appendChild(style);

    const modalHTML = `
        <div class="match-modal-overlay" id="matchModal">
            <div class="match-modal">
                <div class="modal-header">
                    <h2 id="modalMatchTitle">Match Summary</h2>
                    <button class="close-modal" id="closeModal">&times;</button>
                </div>
                <div class="stat-group">
                    <label>Goalscorers</label>
                    <textarea id="modalGoals" placeholder="e.g., Messi 14', 89'"></textarea>
                </div>
                <div class="stat-group">
                    <label>Major Incidents</label>
                    <textarea id="modalIncidents" placeholder="Red Cards, Injuries, VAR controversies..."></textarea>
                </div>
                <div class="stat-group">
                    <label>Man of the Match</label>
                    <textarea id="modalMOTM" placeholder="Enter MOTM..."></textarea>
                </div>
                <input type="hidden" id="modalMatchId">
                <button class="modal-save-btn" id="saveModalBtn">Save Database</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById('closeModal').addEventListener('click', () => { document.getElementById('matchModal').style.display = 'none'; });
    document.getElementById('saveModalBtn').addEventListener('click', saveModalData);
}

function attachModalTriggers() {
    document.querySelectorAll('.match-box').forEach(box => {
        box.style.cursor = 'pointer';
        box.title = "Double-click to open Match Summary";
        box.addEventListener('dblclick', (e) => {
            if (e.target.tagName === 'INPUT') return; 
            const matchId = box.getAttribute('data-match-id');
            if (matchId) openMatchModal(matchId);
        });
    });

    document.querySelectorAll('.match-tracker-wrapper tbody tr').forEach(row => {
        row.style.cursor = 'pointer';
        row.title = "Double-click to open Match Summary";
        row.addEventListener('dblclick', (e) => {
            if (e.target.tagName === 'INPUT') return;
            const firstCell = row.querySelector('td');
            if (firstCell) {
                const matchId = firstCell.textContent.trim();
                if (!isNaN(parseInt(matchId))) openMatchModal(matchId);
            }
        });
    });
}

function openMatchModal(matchId) {
    const modal = document.getElementById('matchModal');
    document.getElementById('modalMatchTitle').textContent = `MATCH ${matchId} DATA`;
    document.getElementById('modalMatchId').value = matchId;

    const stats = tournamentData.matchStats[matchId] || { goals: '', incidents: '', motm: '' };
    document.getElementById('modalGoals').value = stats.goals;
    document.getElementById('modalIncidents').value = stats.incidents;
    document.getElementById('modalMOTM').value = stats.motm;

    modal.style.display = 'flex';
}

function saveModalData() {
    const matchId = document.getElementById('modalMatchId').value;
    if (!matchId) return;

    if (!tournamentData.matchStats) tournamentData.matchStats = {};
    tournamentData.matchStats[matchId] = {
        goals: document.getElementById('modalGoals').value,
        incidents: document.getElementById('modalIncidents').value,
        motm: document.getElementById('modalMOTM').value
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tournamentData));
    
    const btn = document.getElementById('saveModalBtn');
    btn.textContent = "SAVED TO MEMORY ✓";
    setTimeout(() => {
        btn.textContent = "Save Database";
        document.getElementById('matchModal').style.display = 'none';
    }, 1000);
}

// --- THEME ENGINE ---
function setupThemeSwitcher() {
    const container = document.querySelector('.action-buttons');
    if (!container) return;
    const select = document.createElement('select'); select.className = 'theme-switcher';
    
    const coreGroup = document.createElement('optgroup'); coreGroup.label = "--- CORE THEMES ---";
    CORE_THEMES.forEach(t => { const opt = document.createElement('option'); opt.value = t.id; opt.textContent = t.name; coreGroup.appendChild(opt); });
    select.appendChild(coreGroup);

    const nationGroup = document.createElement('optgroup'); nationGroup.label = "--- NATION THEMES ---";
    NATION_THEMES.forEach(n => { const opt = document.createElement('option'); opt.value = `nation-${n.code}`; opt.textContent = n.name; nationGroup.appendChild(opt); });
    select.appendChild(nationGroup);

    select.value = tournamentData.theme || 'dark';
    select.addEventListener('change', (e) => { tournamentData.theme = e.target.value; applyTheme(); saveUI(); });
    container.prepend(select); applyTheme();
}

function applyTheme() {
    const root = document.documentElement; const logo = document.getElementById('mainLogo');
    const themeSelector = document.querySelector('.theme-switcher');
    if (themeSelector) themeSelector.value = tournamentData.theme;
    
    if (tournamentData.theme.startsWith('nation-')) {
        const nation = NATION_THEMES.find(n => n.code === tournamentData.theme.split('-')[1]);
        if (nation) {
            root.style.setProperty('--bg-base', '#0B0E14'); root.style.setProperty('--surface', '#151A22'); root.style.setProperty('--surface-hover', '#1E2532');
            root.style.setProperty('--text-main', '#FFFFFF'); root.style.setProperty('--text-muted', '#94A3B8');
            root.style.setProperty('--border-light', nation.c1); root.style.setProperty('--grad-1', `${nation.c1}40`); root.style.setProperty('--grad-2', `${nation.c2}40`);
            if (logo) logo.src = 'Light_Logo.png'; return; 
        }
    }

    if (tournamentData.theme === 'light') {
        root.style.setProperty('--bg-base', '#F8FAFC'); root.style.setProperty('--surface', '#FFFFFF'); root.style.setProperty('--surface-hover', '#F1F5F9');
        root.style.setProperty('--text-main', '#0F172A'); root.style.setProperty('--text-muted', '#64748B'); root.style.setProperty('--border-light', 'rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--grad-1', 'rgba(255, 0, 85, 0.05)'); root.style.setProperty('--grad-2', 'rgba(0, 240, 255, 0.05)'); if (logo) logo.src = 'Dark_Logo.png'; 
    } else if (tournamentData.theme === 'neon') {
        root.style.setProperty('--bg-base', '#090014'); root.style.setProperty('--surface', '#170030'); root.style.setProperty('--surface-hover', '#220044'); 
        root.style.setProperty('--text-main', '#FF00FF'); root.style.setProperty('--text-muted', '#00FFFF'); root.style.setProperty('--border-light', 'rgba(0, 255, 255, 0.3)');
        root.style.setProperty('--grad-1', 'rgba(0, 255, 255, 0.2)'); root.style.setProperty('--grad-2', 'rgba(255, 255, 0, 0.2)'); if (logo) logo.src = 'Light_Logo.png';
    } else if (tournamentData.theme === 'classic') {
        root.style.setProperty('--bg-base', '#0A1F13'); root.style.setProperty('--surface', '#12301E'); root.style.setProperty('--surface-hover', '#1A4028');
        root.style.setProperty('--text-main', '#FFFFFF'); root.style.setProperty('--text-muted', '#E1FF00'); root.style.setProperty('--border-light', 'rgba(225, 255, 0, 0.3)');
        root.style.setProperty('--grad-1', 'rgba(225, 255, 0, 0.15)'); root.style.setProperty('--grad-2', 'rgba(255, 215, 0, 0.15)'); if (logo) logo.src = 'Light_Logo.png';
    } else if (tournamentData.theme === 'ocean') {
        root.style.setProperty('--bg-base', '#001b2e'); root.style.setProperty('--surface', '#012a4a'); root.style.setProperty('--surface-hover', '#013a63');
        root.style.setProperty('--text-main', '#e0fbfc'); root.style.setProperty('--text-muted', '#98c1d9'); root.style.setProperty('--border-light', 'rgba(224, 251, 252, 0.2)');
        root.style.setProperty('--grad-1', 'rgba(41, 50, 65, 0.4)'); root.style.setProperty('--grad-2', 'rgba(152, 193, 217, 0.4)'); if (logo) logo.src = 'Light_Logo.png';
    } else if (tournamentData.theme === 'cyber') {
        root.style.setProperty('--bg-base', '#050505'); root.style.setProperty('--surface', '#0a0a0a'); root.style.setProperty('--surface-hover', '#141414');
        root.style.setProperty('--text-main', '#FF003C'); root.style.setProperty('--text-muted', '#00FF41'); root.style.setProperty('--border-light', 'rgba(255, 0, 60, 0.3)');
        root.style.setProperty('--grad-1', 'rgba(0, 255, 65, 0.15)'); root.style.setProperty('--grad-2', 'rgba(255, 0, 60, 0.15)'); if (logo) logo.src = 'Light_Logo.png';
    } else if (tournamentData.theme === 'gold') {
        root.style.setProperty('--bg-base', '#1a1814'); root.style.setProperty('--surface', '#2a261f'); root.style.setProperty('--surface-hover', '#3a352b');
        root.style.setProperty('--text-main', '#d4af37'); root.style.setProperty('--text-muted', '#a89f91'); root.style.setProperty('--border-light', 'rgba(212, 175, 55, 0.3)');
        root.style.setProperty('--grad-1', 'rgba(212, 175, 55, 0.15)'); root.style.setProperty('--grad-2', 'rgba(255, 255, 255, 0.05)'); if (logo) logo.src = 'Light_Logo.png';
    } else {
        root.style.setProperty('--bg-base', '#0B0E14'); root.style.setProperty('--surface', '#151A22'); root.style.setProperty('--surface-hover', '#1E2532');
        root.style.setProperty('--text-main', '#FFFFFF'); root.style.setProperty('--text-muted', '#94A3B8'); root.style.setProperty('--border-light', 'rgba(255, 255, 255, 0.15)');
        root.style.setProperty('--grad-1', 'rgba(255, 0, 85, 0.15)'); root.style.setProperty('--grad-2', 'rgba(0, 240, 255, 0.15)'); if (logo) logo.src = 'Light_Logo.png';
    }
}

// --- MATH ENGINES (HARVESTER, SORTER, ROUTER, CASCADER) ---

function calculateGroupStages() {
    let stats = {};
    for (const group in TOURNAMENT_GROUPS) {
        TOURNAMENT_GROUPS[group].forEach(team => { stats[team] = { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: group, abbr: team }; });
    }

    const groupRows = document.querySelectorAll('.match-tracker-wrapper tbody tr');
    for(let i = 0; i < 72; i++) {
        const row = groupRows[i]; if(!row) continue;
        const nationCell = row.querySelector('.nation-cell'); if(!nationCell) continue;
        const abbrs = nationCell.querySelectorAll('.abbr'); if(abbrs.length !== 2) continue; 

        const team1 = abbrs[0].textContent.replace(/[\(\)]/g, '').trim();
        const team2 = abbrs[1].textContent.replace(/[\(\)]/g, '').trim();
        const scoreInputs = row.querySelectorAll('.score-input'); if(scoreInputs.length !== 2) continue;

        const s1 = scoreInputs[0].value; const s2 = scoreInputs[1].value;

        if(s1 !== "" && s2 !== "") {
            const g1 = parseInt(s1, 10); const g2 = parseInt(s2, 10);
            stats[team1].p++; stats[team2].p++;
            stats[team1].gf += g1; stats[team1].ga += g2;
            stats[team2].gf += g2; stats[team2].ga += g1;
            stats[team1].gd = stats[team1].gf - stats[team1].ga;
            stats[team2].gd = stats[team2].gf - stats[team2].ga;

            if(g1 > g2) { stats[team1].w++; stats[team1].pts += 3; stats[team2].l++; } 
            else if (g1 < g2) { stats[team2].w++; stats[team2].pts += 3; stats[team1].l++; } 
            else { stats[team1].d++; stats[team1].pts += 1; stats[team2].d++; stats[team2].pts += 1; }
        }
    }
    updateGroupTables(stats);
}

function updateGroupTables(stats) {
    const tables = document.querySelectorAll('.groups-container .table-wrapper table');
    const groupLetters = Object.keys(TOURNAMENT_GROUPS);
    const finalStandings = {}; 

    tables.forEach((table, index) => {
        const groupLetter = groupLetters[index];
        let teamsInGroup = TOURNAMENT_GROUPS[groupLetter].map(abbr => stats[abbr]);
        
        teamsInGroup.sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts; 
            if (b.gd !== a.gd) return b.gd - a.gd;     
            return b.gf - a.gf;                        
        });

        finalStandings[groupLetter] = teamsInGroup;

        const tbodyRows = table.querySelectorAll('tbody tr');
        teamsInGroup.forEach((teamData, rowIndex) => {
            const tr = tbodyRows[rowIndex]; if(!tr) return;
            const tds = tr.querySelectorAll('td');
            tds[0].innerHTML = nationHTML[teamData.abbr]; 
            tds[1].textContent = teamData.p > 0 ? teamData.p : ''; tds[2].textContent = teamData.p > 0 ? teamData.w : '';
            tds[3].textContent = teamData.p > 0 ? teamData.d : ''; tds[4].textContent = teamData.p > 0 ? teamData.l : '';
            tds[5].textContent = teamData.p > 0 ? teamData.gf : ''; tds[6].textContent = teamData.p > 0 ? teamData.ga : '';
            tds[7].textContent = teamData.p > 0 ? teamData.gd : ''; tds[8].textContent = teamData.p > 0 ? teamData.pts : '';
        });
    });
    calculateRoundOf32(finalStandings);
}

function calculateRoundOf32(standings) {
    const getFullName = (abbr) => {
        if(!abbr) return null; const nation = NATION_THEMES.find(n => n.code === abbr); return nation ? nation.name : abbr;
    };
    const isGroupFinished = (groupLetter) => {
        return standings[groupLetter].reduce((sum, team) => sum + team.p, 0) === 12; 
    };

    if (isGroupFinished('A')) { injectKnockoutTeam(79, 1, getFullName(standings['A'][0]?.abbr)); injectKnockoutTeam(73, 1, getFullName(standings['A'][1]?.abbr)); }
    if (isGroupFinished('B')) { injectKnockoutTeam(85, 1, getFullName(standings['B'][0]?.abbr)); injectKnockoutTeam(73, 2, getFullName(standings['B'][1]?.abbr)); }
    if (isGroupFinished('C')) { injectKnockoutTeam(76, 1, getFullName(standings['C'][0]?.abbr)); injectKnockoutTeam(75, 2, getFullName(standings['C'][1]?.abbr)); }
    if (isGroupFinished('D')) { injectKnockoutTeam(81, 1, getFullName(standings['D'][0]?.abbr)); injectKnockoutTeam(88, 1, getFullName(standings['D'][1]?.abbr)); }
    if (isGroupFinished('E')) { injectKnockoutTeam(74, 1, getFullName(standings['E'][0]?.abbr)); injectKnockoutTeam(78, 1, getFullName(standings['E'][1]?.abbr)); }
    if (isGroupFinished('F')) { injectKnockoutTeam(75, 1, getFullName(standings['F'][0]?.abbr)); injectKnockoutTeam(76, 2, getFullName(standings['F'][1]?.abbr)); }
    if (isGroupFinished('G')) { injectKnockoutTeam(82, 1, getFullName(standings['G'][0]?.abbr)); injectKnockoutTeam(88, 2, getFullName(standings['G'][1]?.abbr)); }
    if (isGroupFinished('H')) { injectKnockoutTeam(84, 1, getFullName(standings['H'][0]?.abbr)); injectKnockoutTeam(86, 2, getFullName(standings['H'][1]?.abbr)); }
    if (isGroupFinished('I')) { injectKnockoutTeam(77, 1, getFullName(standings['I'][0]?.abbr)); injectKnockoutTeam(78, 2, getFullName(standings['I'][1]?.abbr)); }
    if (isGroupFinished('J')) { injectKnockoutTeam(86, 1, getFullName(standings['J'][0]?.abbr)); injectKnockoutTeam(84, 2, getFullName(standings['J'][1]?.abbr)); }
    if (isGroupFinished('K')) { injectKnockoutTeam(87, 1, getFullName(standings['K'][0]?.abbr)); injectKnockoutTeam(83, 1, getFullName(standings['K'][1]?.abbr)); }
    if (isGroupFinished('L')) { injectKnockoutTeam(80, 1, getFullName(standings['L'][0]?.abbr)); injectKnockoutTeam(83, 2, getFullName(standings['L'][1]?.abbr)); }

    let totalTournamentAppearances = 0;
    for (let group in standings) totalTournamentAppearances += standings[group].reduce((sum, team) => sum + team.p, 0);
    if (totalTournamentAppearances < 144) return;

    let thirdPlaces = [];
    for(let group in standings) if(standings[group][2]) thirdPlaces.push(standings[group][2]);

    thirdPlaces.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts; if (b.gd !== a.gd) return b.gd - a.gd; return b.gf - a.gf;
    });

    const top8 = thirdPlaces.slice(0, 8);
    // --- BAND-AID PATCH: REORDERED TO FORCE SPECIFIC 3RD PLACE DRAFTING ---
    const slots = [
        // 1. Force France (M77) to draft before Germany (M74)
        { matchId: 77, teamNum: 2, accepts: ['C','D','F','G','H'], teamAbbr: null },
        { matchId: 74, teamNum: 2, accepts: ['A','B','C','D','F'], teamAbbr: null },
        { matchId: 79, teamNum: 2, accepts: ['C','E','F','H','I'], teamAbbr: null },
        { matchId: 85, teamNum: 2, accepts: ['E','F','G','I','J'], teamAbbr: null },
        { matchId: 82, teamNum: 2, accepts: ['A','E','H','I','J'], teamAbbr: null },
        { matchId: 81, teamNum: 2, accepts: ['B','E','F','I','J'], teamAbbr: null },
        { matchId: 80, teamNum: 2, accepts: ['E','H','I','J','K'], teamAbbr: null },
        { matchId: 87, teamNum: 2, accepts: ['D','E','I','J','L'], teamAbbr: null }
    ];

    function backtrack(index) {
        if (index === top8.length) return true; 
        const currentTeam = top8[index];
        for (let i = 0; i < slots.length; i++) {
            if (slots[i].teamAbbr === null && slots[i].accepts.includes(currentTeam.group)) {
                slots[i].teamAbbr = currentTeam.abbr; if (backtrack(index + 1)) return true; slots[i].teamAbbr = null; 
            }
        }
        return false;
    }

    if (top8.length === 8 && top8.every(t => t.p > 0)) {
        backtrack(0); slots.forEach(slot => { injectKnockoutTeam(slot.matchId, slot.teamNum, getFullName(slot.teamAbbr)); });
    }
}

function injectKnockoutTeam(matchId, teamNum, teamFullName) {
    if(teamFullName === undefined || teamFullName === null) return;
    const wallBox = document.querySelector(`.match-box[data-match-id="${matchId}"]`);
    if (wallBox) {
        const inputs = wallBox.querySelectorAll('.team-input');
        if(inputs[teamNum - 1] && inputs[teamNum - 1].value !== teamFullName) { inputs[teamNum - 1].value = teamFullName; saveUI(); }
    }
    document.querySelectorAll('.match-tracker-wrapper tbody tr').forEach(row => {
        const firstCell = row.querySelector('td');
        if (firstCell && firstCell.textContent.trim() === String(matchId)) {
            const inputs = row.querySelectorAll('.team-input');
            if(inputs[teamNum - 1] && inputs[teamNum - 1].value !== teamFullName) { inputs[teamNum - 1].value = teamFullName; saveUI(); }
        }
    });
}

function calculateKnockouts() {
    const knockoutRoutes = [
        // Round of 16
        { source: 74, target: 89, targetTeamNum: 1 }, { source: 77, target: 89, targetTeamNum: 2 },
        { source: 73, target: 90, targetTeamNum: 1 }, { source: 75, target: 90, targetTeamNum: 2 },
        { source: 76, target: 91, targetTeamNum: 1 }, { source: 78, target: 91, targetTeamNum: 2 },
        { source: 79, target: 92, targetTeamNum: 1 }, { source: 80, target: 92, targetTeamNum: 2 },
        { source: 83, target: 93, targetTeamNum: 1 }, { source: 84, target: 93, targetTeamNum: 2 },
        { source: 81, target: 94, targetTeamNum: 1 }, { source: 82, target: 94, targetTeamNum: 2 },
        { source: 86, target: 95, targetTeamNum: 1 }, { source: 88, target: 95, targetTeamNum: 2 },
        { source: 85, target: 96, targetTeamNum: 1 }, { source: 87, target: 96, targetTeamNum: 2 },
        // Quarter Finals
        { source: 89, target: 97, targetTeamNum: 1 }, { source: 90, target: 97, targetTeamNum: 2 },
        { source: 93, target: 98, targetTeamNum: 1 }, { source: 94, target: 98, targetTeamNum: 2 },
        { source: 91, target: 99, targetTeamNum: 1 }, { source: 92, target: 99, targetTeamNum: 2 },
        { source: 95, target: 100, targetTeamNum: 1 }, { source: 96, target: 100, targetTeamNum: 2 },
        // Semi Finals
        { source: 97, target: 101, targetTeamNum: 1 }, { source: 98, target: 101, targetTeamNum: 2 },
        { source: 99, target: 102, targetTeamNum: 1 }, { source: 100, target: 102, targetTeamNum: 2 },
        // Finals
        { source: 101, target: 104, targetTeamNum: 1 }, { source: 102, target: 104, targetTeamNum: 2 },
        // Third Place
        { source: 101, target: 103, targetTeamNum: 1, isLoser: true }, { source: 102, target: 103, targetTeamNum: 2, isLoser: true }
    ];

    knockoutRoutes.forEach(route => {
        const sourceMatch = getKnockoutMatchData(route.source);
        if (sourceMatch && sourceMatch.winner) {
            injectKnockoutTeam(route.target, route.targetTeamNum, route.isLoser ? sourceMatch.loser : sourceMatch.winner);
        } else {
            // FIX: Erase the downstream target if the score is deleted or tied
            injectKnockoutTeam(route.target, route.targetTeamNum, "");
        }
    });

    // --- NEW: AUTOMATICALLY CROWN THE CHAMPION ---
    const finalMatch = getKnockoutMatchData(104);
    const championInput = document.getElementById('championInput');
    
    if (championInput) {
        // Lock the UI so users cannot tamper with the final result
        championInput.setAttribute('readonly', 'true');
        championInput.style.pointerEvents = 'none';
        
        if (finalMatch && finalMatch.winner) {
            // If the final has a winner, inject it and save state
            if (championInput.value !== finalMatch.winner) {
                championInput.value = finalMatch.winner;
                saveUI();
            }
        } else {
            // If the final score is cleared, reset the champion box
            if (championInput.value !== '') {
                championInput.value = '';
                saveUI();
            }
        }
    }
}

function getKnockoutMatchData(matchId) {
    let data = null;
    document.querySelectorAll('.match-tracker-wrapper tbody tr').forEach(row => {
        const firstCell = row.querySelector('td');
        if (firstCell && firstCell.textContent.trim() === String(matchId)) {
            const inputs = row.querySelectorAll('.team-input'); const scores = row.querySelectorAll('.score-input');
            if (inputs.length === 2 && scores.length === 2) {
                if (inputs[0].value && inputs[1].value && scores[0].value !== "" && scores[1].value !== "") {
                    const g1 = parseInt(scores[0].value, 10); const g2 = parseInt(scores[1].value, 10);
                    if (g1 > g2) data = { winner: inputs[0].value, loser: inputs[1].value };
                    else if (g2 > g1) data = { winner: inputs[1].value, loser: inputs[0].value };
                }
            }
        }
    });
    return data;
}

// --- DYNAMIC PLACEHOLDER FIX ---
function fixTrackerPlaceholders() {
    const routeMap = {
        89: ['W74', 'W77'], 90: ['W73', 'W75'], 91: ['W76', 'W78'], 92: ['W79', 'W80'],
        93: ['W83', 'W84'], 94: ['W81', 'W82'], 95: ['W86', 'W88'], 96: ['W85', 'W87'],
        97: ['W89', 'W90'], 98: ['W93', 'W94'], 99: ['W91', 'W92'], 100: ['W95', 'W96'],
        101: ['W97', 'W98'], 102: ['W99', 'W100'], 103: ['L101', 'L102'], 104: ['W101', 'W102']
    };
    
    document.querySelectorAll('.match-tracker-wrapper tbody tr').forEach(row => {
        const matchIdCell = row.querySelector('td');
        if (!matchIdCell) return;
        const matchId = parseInt(matchIdCell.textContent.trim());
        if (routeMap[matchId]) {
            const inputs = row.querySelectorAll('.team-input');
            if (inputs.length === 2) {
                inputs[0].placeholder = routeMap[matchId][0];
                inputs[1].placeholder = routeMap[matchId][1];
            }
        }
    });
}