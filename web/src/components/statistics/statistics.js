import {StatType} from "../../shared/utils.js";

function createSeasonStatRow(stat) {
    return `
        <div class="stat-row">
            <dt class="statistics-label">${stat.label}</dt>
            <dd class="statistics-value">${stat.value}</dd>
        </div>
    `;
}

function createHistoryStatRow(stat, i, arr) {
    return `
        <div class="stat-row">
            <dt class="statistics-label">${stat.label}</dt>
            <dd class="statistics-value">${stat.value}</dd>
        </div>
        ${i < arr.length - 1 ? '<hr class="stat-section-divider">' : ''}
    `;
}


export function renderStatistics(seasonStats, historyStats, statType) {
    const statsSection = document.createElement('section');
    statsSection.className = 'stats-section';
    const seasonGroup1 = seasonStats.slice(0, 2).map(createSeasonStatRow).join('');
    const seasonGroup2 = seasonStats.slice(2, 10).map(createSeasonStatRow).join('');
    const seasonGroup3 = seasonStats.slice(10, 16).map(createSeasonStatRow).join('');
    const historyStatsHTML = historyStats.map(createHistoryStatRow).join('');

    const statsPlaceholder = document.getElementById('stats-section');
    statsPlaceholder.replaceWith(statsSection);

    const html = `
            <div class="container">
                <h1 class="stats-title">STATISTICS</h1>
                
                <div class="content-grid">
                    <div class="season-stats">
                        <h2 class="season-title">${new Date().getFullYear()} SEASON</h2>
                        <dl class="stats-grid">${seasonGroup1}</dl>
                        <hr class="stat-section-divider">
                        <dl class="stats-grid">${seasonGroup2}</dl>
                        <hr class="stat-section-divider">
                        <dl class="stats-grid">${seasonGroup3}</dl>
                        <hr class="stat-section-divider">
                        <button class="button season">Full season results</button>
                    </div>
    
                    <div class="summary-box">
                        <h2 class="summary-title">${statType === StatType.TEAM ? 'TEAM SUMMARY' : 'CAREER STATS'}</h2>
                        ${historyStatsHTML}
                        <button class="button summary">Results archive</button>
                    </div>
                </div> 
            </div>  
    `;

    statsSection.innerHTML = html;
}

