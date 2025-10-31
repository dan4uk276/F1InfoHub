// API Configuration
export const API_CONFIG = {
    baseUrl: 'http://localhost:8080/api/v1',
    endpoints: {
        driverById: '/drivers/',
        backgroundImages: '/images/backgrounds/',
        driverImages: '/images/drivers/',
        allDrivers: '/drivers',
        searchByName: '/drivers/search/by-name',
        filterByTeam: '/drivers/search/by-team'
    }
};