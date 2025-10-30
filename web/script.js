// API Configuration
const API_CONFIG = {
    baseUrl: 'http://localhost:8080/api/v1',
    endpoints: {
        backgroundImages: '/images/backgrounds/',
        driverImages: '/images/drivers/',
        allDrivers: '/drivers',
        searchByName: '/drivers/search/by-name',
        filterByTeam: '/drivers/search/by-team'
    }
};

// State
let allDrivers = [];
let filteredDrivers = [];
let currentTeamFilter = 'all';

// Team colors mapping
const teamClasses = {
    'McLaren': 'mclaren',
    'Mercedes': 'mercedes',
    'Ferrari': 'ferrari',
    'Red Bull Racing': 'redbull',
    'Alpine': 'alpine',
    'Aston Martin': 'aston-martin',
    'Haas': 'haas',
    'RB': 'rb',
    'Kick Sauber': 'kick-sauber',
    'Williams': 'williams'
};

// Get team class
function getTeamClass(teamName) {
    if (!teamName) return 'mclaren';

    if (teamClasses[teamName]) {
        return teamClasses[teamName];
    }

    const teamLower = teamName.toLowerCase();
    for (const [key, value] of Object.entries(teamClasses)) {
        if (teamLower.includes(key.toLowerCase()) || key.toLowerCase().includes(teamLower)) {
            return value;
        }
    }

    return 'mclaren';
}

function getDriverImagePath(driver) {
    if (driver.imageFilename) {
        // Используем API endpoint для получения изображений
        return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}${driver.imageFilename}`;
    }

    return `https://via.placeholder.com/300x400/333/fff?text=${encodeURIComponent(driver.name || 'Driver')}`;
}

// Create driver card
function createDriverCard(driver, index) {
    const card = document.createElement('div');

    const nameParts = (driver.name || 'Unknown Driver').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const teamName = driver.team || driver.teamName || 'Unknown Team';
    const teamInitials = teamName.split(' ')
        .map(word => word[0])
        .join('')
        .substring(0, 3)
        .toUpperCase();

    const teamClass = getTeamClass(teamName);
    const imagePath = getDriverImagePath(driver);
    const backgroundImagePath = `${API_CONFIG.baseUrl + API_CONFIG.endpoints.backgroundImages}F1_driver_card_background.png`;

    card.className = `driver-card ${teamClass}`;

    card.style.setProperty('animation-delay', `${index * 0.05}s`);
    card.style.setProperty('--driver-bg-image', `url(${backgroundImagePath})`);


    card.innerHTML = `
        <div class="driver-header">
            <div class="driver-info">
                <div class="driver-name">${firstName}</div>
                <div class="driver-surname">${lastName}</div>
                <div class="team-info">
                    <div class="team-name">${teamName}</div>
                </div>
            </div>
            <div class="driver-number-badge ${teamClass}">${driver.number || '?'}</div>
        </div>
        
        <div class="driver-image-container">
            <picture>
                <source srcset="${imagePath}" type="image/avif">
                <img 
                    src="${imagePath}" 
                    alt="${driver.name}"
                    class="driver-image"
                    loading="lazy"
                    onerror="this.style.opacity='0.1'"
                >
            </picture>
        </div>
        
        <div class="driver-footer">
            <div class="flag">
                <img src="https://flagsapi.com/${getCountryFlag(driver.country)}/flat/64.png" alt="${getCountryFlag(driver.country)}">
            </div>
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-label">Points</div>
                    <div class="stat-value">${Math.round(driver.points) || 0}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Podiums</div>
                    <div class="stat-value">${driver.podiums || 0}</div>
                </div>
            </div>
        </div>
    `;

    return card;
}

// Get country flag
function getCountryFlag(country) {
    if (!country) return '?';

    const flags = {
        'Australia': 'AU',
        'United Kingdom': 'GB',
        'Great Britain': 'GB',
        'England': 'GB',
        'Italy': 'IT',
        'Monaco': 'MC',
        'Netherlands': 'NL',
        'Japan': 'JP',
        'France': 'FR',
        'Spain': 'ES',
        'Canada': 'CA',
        'New Zealand': 'NZ',
        'Germany': 'DE',
        'Brazil': 'BR',
        'Thailand': 'TH',
        'Mexico': 'MX',
        'Finland': 'FI',
        'Denmark': 'DK',
        'China': 'CN',
        'Austria': 'AT',
        'Switzerland': 'CH',
        'Belgium': 'BE',
        'Poland': 'PL',
        'Russia': 'RU',
        'Argentina': 'AR'
    };

    return flags[country];
}

// Render drivers
function renderDrivers(drivers) {
    const container = document.getElementById('driversContainer');

    if (drivers.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h2>No drivers found</h2>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'drivers-grid';

    drivers.forEach((driver, index) => {
        const card = createDriverCard(driver, index);
        grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
}

// Show loading
function showLoading() {
    const container = document.getElementById('driversContainer');
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            Loading drivers...
        </div>
    `;
}

// Show error
function showError(message) {
    const container = document.getElementById('driversContainer');
    container.innerHTML = `
        <div class="error">
            <h2>⚠️ Error Loading Data</h2>
            <p>${message}</p>
            <p style="margin-top: 15px; opacity: 0.7;">Please check if the backend server is running</p>
        </div>
    `;
}

// Load all drivers
async function loadDrivers() {
    showLoading();

    try {
        console.log('Fetching drivers from:', `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.allDrivers}`);

        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.allDrivers}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Received drivers:', data);

        allDrivers = Array.isArray(data) ? data : data.drivers || [];

        if (allDrivers.length === 0) {
            throw new Error('No drivers data received from API');
        }

        filteredDrivers = allDrivers;
        populateTeamFilter();
        renderDrivers(filteredDrivers);

    } catch (error) {
        console.error('Error loading drivers:', error);
        showError(error.message);
    }
}

// Search drivers by name
async function searchDrivers(searchTerm) {
    if (!searchTerm.trim()) {
        filteredDrivers = currentTeamFilter === 'all'
            ? allDrivers
            : allDrivers.filter(d => (d.team || d.teamName) === currentTeamFilter);
        renderDrivers(filteredDrivers);
        return;
    }

    showLoading();

    try {
        const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.searchByName}?name=${encodeURIComponent(searchTerm)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Search failed: HTTP ${response.status}`);
        }

        let drivers = await response.json();
        drivers = Array.isArray(drivers) ? drivers : drivers.drivers || [];

        if (currentTeamFilter !== 'all') {
            drivers = drivers.filter(d => (d.team || d.teamName) === currentTeamFilter);
        }

        filteredDrivers = drivers;
        renderDrivers(filteredDrivers);

    } catch (error) {
        console.error('Search error:', error);

        const searchLower = searchTerm.toLowerCase();
        filteredDrivers = allDrivers.filter(d => {
            const name = (d.name || '').toLowerCase();
            const matchesSearch = name.includes(searchLower);
            const teamName = d.team || d.teamName;
            const matchesTeam = currentTeamFilter === 'all' || teamName === currentTeamFilter;
            return matchesSearch && matchesTeam;
        });
        renderDrivers(filteredDrivers);
    }
}

// Filter by team
function filterByTeam(team) {
    currentTeamFilter = team;
    const searchTerm = document.getElementById('searchInput').value;

    if (searchTerm.trim()) {
        searchDrivers(searchTerm);
    } else {
        filteredDrivers = team === 'all'
            ? allDrivers
            : allDrivers.filter(d => (d.team || d.teamName) === team);
        renderDrivers(filteredDrivers);
    }
}

// Populate team filter
function populateTeamFilter() {
    const teams = [...new Set(allDrivers.map(d => d.team || d.teamName))].filter(Boolean).sort();
    const filterMenu = document.getElementById('filterMenu');

    filterMenu.innerHTML = `
        <div class="filter-option active" data-team="all">
            <span class="team-badge" style="background: linear-gradient(45deg, #e10600, #ff6b00);">⭐</span>
            <span>All Teams</span>
        </div>
    `;

    teams.forEach(team => {
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.setAttribute('data-team', team);

        const badge = document.createElement('span');
        badge.className = 'team-badge';

        const teamClass = getTeamClass(team);
        const tempDiv = document.createElement('div');
        tempDiv.className = `driver-card ${teamClass}`;
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);
        badge.style.background = getComputedStyle(tempDiv).background;
        document.body.removeChild(tempDiv);

        const span = document.createElement('span');
        span.textContent = team;

        option.appendChild(badge);
        option.appendChild(span);

        option.addEventListener('click', () => {
            document.querySelectorAll('.filter-option').forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            document.getElementById('filterText').textContent = team;
            document.getElementById('filterMenu').classList.remove('active');
            filterByTeam(team);
        });

        filterMenu.appendChild(option);
    });

    filterMenu.querySelector('[data-team="all"]').addEventListener('click', () => {
        document.querySelectorAll('.filter-option').forEach(o => o.classList.remove('active'));
        filterMenu.querySelector('[data-team="all"]').classList.add('active');
        document.getElementById('filterText').textContent = 'All Teams';
        document.getElementById('filterMenu').classList.remove('active');
        filterByTeam('all');
    });
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        searchDrivers(searchTerm);
    }, 300);
});

document.getElementById('filterButton').addEventListener('click', () => {
    document.getElementById('filterMenu').classList.toggle('active');
});

document.addEventListener('click', (e) => {
    const filterDropdown = document.querySelector('.filter-dropdown');
    if (!filterDropdown.contains(e.target)) {
        document.getElementById('filterMenu').classList.remove('active');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing F1 Drivers App...');
    loadDrivers();
});