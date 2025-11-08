import {getTeamClass} from "../../shared/utils.js";
import {API_CONFIG} from "../../shared/config.js";

export function createTeamCard(team, index) {
    const card = document.createElement('div');

    const teamClass = getTeamClass(team.name);
    const carImagePath = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.carImages}${team.carImageFilename}`;
    const backgroundImagePath = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.backgroundImages}F1_driver_card_background.png`;
    const driver1ImageFilename = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}${team.driver1ImageFilename}`;
    const driver2ImageFilename = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.driverImages}${team.driver2ImageFilename}`;
    const logoUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.teamLogos}${team.logoUrl}`;
    // Get driver names
    const driver1Name = team.driver1Name;
    const driver2Name = team.driver2Name;

    card.className = `team-card ${teamClass}`;
    card.style.setProperty('animation-delay', `${index * 0.05}s`);
    card.style.setProperty('--team-bg-image', `url(${backgroundImagePath})`);

    card.innerHTML = ` 
        <div class="team-header">
            <div class="team-info">
                <div class="team-name">${team.name}</div>
                
                <div class="team-drivers">
                    <div class="driver-item">
                        <div class="driver-avatar">
                            <picture>
                                <source srcset="${driver1ImageFilename}" type="image/avif">
                                <img 
                                    src="${driver1ImageFilename}" 
                                    alt="${team.driver1Name} car"
                                    class="driver-image"
                                    loading="lazy"
                                    onerror="this.style.opacity='0.1'"
                                >
                            </picture>
                        </div>
                        <span class="driver-name-short">${driver1Name}</span>
                    </div>
                    <div class="driver-item">
                        <div class="driver-avatar">
                            <picture>
                                <source srcset="${driver2ImageFilename}" type="image/avif">
                                <img 
                                    src="${driver2ImageFilename}" 
                                    alt="${team.driver2Name} car"
                                    class="driver-image"
                                    loading="lazy"
                                    onerror="this.style.opacity='0.1'"
                                >
                            </picture>
                        </div>
                        <span class="driver-name-short">${driver2Name}</span>
                    </div>
                </div>
            </div>
            
            <div class="team-logo">
                <picture>
                    <source srcset="${logoUrl}" type="image/avif">
                    <img src="${logoUrl}"
                         alt="${team.name} logo"
                         onerror="this.style.opacity='0.3'">
                </picture>
            </div>
            
          
        </div>
        
        <div class="car-image-container">
            <picture>
                <source srcset="${carImagePath}" type="image/avif">
                <img 
                    src="${carImagePath}" 
                    alt="${team.name} car"
                    class="car-image"
                    loading="lazy"
                    onerror="this.style.opacity='0.1'"
                >
            </picture>
        </div>
            
    `;

    card.addEventListener('click', () => {
        window.location.href = `../teamProfile/?id=${team.id}`;
    });

    return card;
}