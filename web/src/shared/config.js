export const API_CONFIG = {
    baseUrl: 'http://localhost:8080/api/v1',
    endpoints: {
        backgroundImages: '/images/backgrounds/',
        driverImages: '/images/drivers/',
        teamLogos: '/images/teams/',
        carImages: '/images/cars/',
        allDrivers: '/drivers',
        driverById: '/drivers/',
        searchByName: '/drivers/search/by-name',
        filterByTeam: '/drivers/search/by-team',
        allTeams: '/teams',
        teamById: '/teams/',
        schedule: '/schedule',
        results: '/results'
    }
};

export const CACHE_CONFIG = {
    enabled: true,
    ttl: 5 * 60 * 1000 // 5 minutes
};

export const ROUTES = {
    home: '/',
    allDrivers: '/src/pages/allDrivers/',
    driverDetails: '/src/pages/driverFullInfo/',
    teams: '/src/pages/teams/',
    schedule: '/src/pages/schedule/',
    results: '/src/pages/results/'
};