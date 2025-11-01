import { API_CONFIG } from './config.js';

async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function fetchAllDrivers() {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.allDrivers}`;
    return fetchData(url);
}

export async function fetchDriverById(id) {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverById}${id}`;
    const data = await fetchData(url);
    console.log(`Driver info: `, data);
    return enhanceDriverData(data);
}

function enhanceDriverData(driver) {
    return {
        ...driver,
        // Season Stats
        seasonPosition: driver.seasonPosition || 'X',
        seasonPoints: driver.seasonPoints || 'X',
        gpRaces: driver.gpRaces || 'X',
        gpPoints: driver.gpPoints || 'X',
        gpWins: driver.gpWins || 'X',
        gpPodiums: driver.gpPodiums || 'X',
        gpPoles: driver.gpPoles || 'X',
        gpTop10s: driver.gpTop10s || 'X',
        fastestLaps: driver.fastestLaps || 'X',
        dnfs: driver.dnfs || 'X',
        sprintRaces: driver.sprintRaces || 'X',
        sprintPoints: driver.sprintPoints || 'X',

        // Career Stats
        gpEntered: driver.gpEntered || 'X',
        careerPoints: driver.careerPoints || 'X',
        highestFinish: driver.highestFinish || 'X',
        highestGrid: driver.highestGrid || 'X',
        polePositions: driver.polePositions || 'X',
        careerDnfs: driver.careerDnfs || 'X',

        // Bio Info
        quote: driver.quote || "I'M READY TO BRING THE FIGHT TO EVERYONE.",
        dateOfBirth: driver.dateOfBirth || 'X',
        placeOfBirth: driver.placeOfBirth || 'X'
    };
}

export async function searchDriverByName(name) {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.searchByName}?name=${encodeURIComponent(name)}`;
    return fetchData(url);
}

export async function filterDriversByTeam(team) {
    if (team === 'all') {
        return fetchAllDrivers();
    }
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.filterByTeam}?teamName=${encodeURIComponent(team)}`;
    return fetchData(url);
}

// Team API calls
export async function fetchAllTeams() {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.allTeams}`;
    return fetchData(url);
}

export async function fetchTeamById(id) {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.teamById}${id}`;
    return fetchData(url);
}

// Schedule API calls
export async function fetchSchedule() {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.schedule}`;
    return fetchData(url);
}

// Results API calls
export async function fetchResults() {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.results}`;
    return fetchData(url);
}