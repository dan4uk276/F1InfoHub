import {API_CONFIG} from "../../shared/config.js";
import {getTeamClass} from "../../shared/utils.js";

export function renderTeamHeroSection(team) {
    const heroSection = document.createElement('section');
    const teamClass = getTeamClass(team.name);
    heroSection.className = 'hero-section';
    heroSection.innerHTML = `
        <div class="hero-container">
            <div class="hero-content"></div>
        </div>`;

    const heroPlaceholder = document.getElementById('hero-placeholder');
    heroPlaceholder.replaceWith(heroSection);

    heroSection.classList.add(teamClass);

    // Set background image
    const backgroundImagePath = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.backgroundImages}F1_driver_card_background.png`;
    heroSection.style.setProperty('--bg-image', `url(${backgroundImagePath})`);

    const heroContent = heroSection.querySelector('.hero-content');

    // Construct car image path
    const carImagePath = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.carImages}${team.imageFilename}`;
    const logoUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.teamLogos}${team.logoUrl}`;

    heroContent.innerHTML = `
        <div class="hero-image-wrapper">  
            <picture>
            <source srcset="${carImagePath}" type="image/avif">
            <img src="${carImagePath}" 
                 alt="${team.name} Car"
                 class="hero-car-image"
                 onerror="this.style.display='none'">
            </picture>
        </div>
        
        <div class="team-name-info">
            <div class="team-line-wrapper left">
                <span class="team-line top"></span>
                <span class="team-line bottom"></span>
            </div>
            <h1 class="team-name-large">${team.name}</h1>
            <div class="team-line-wrapper right">
                <span class="team-line top"></span>
                <span class="team-line bottom"></span>
            </div>
        </div>
        <div class="drivers">
                <h2 class="driver-name-info">${team.drivers[0].name}</h2>
                <span class="divider"></span>
                <h2 class="driver-name-info">${team.drivers[1].name}</h2>
        </div>
        <div class="team-logo-main">
           <picture>
               <source srcset="${logoUrl}" type="image/avif">
               <img src="${logoUrl}"
                     alt="${team.name} logo"
                     onerror="this.style.opacity='0.3'">
           </picture>
        </div>
    `;
}

// <div className="team-base-info">
//     <div className="base-info-item">
//         <span className="base-info-label">Full Team Name</span>
//         <span className="base-info-value">${team.fullTeamName || team.name}</span>
//     </div>
//     <div className="base-info-item">
//         <span className="base-info-label">Base</span>
//         <span className="base-info-value">${team.base || 'N/A'}</span>
//     </div>
//     <div className="base-info-item">
//         <span className="base-info-label">Team Chief</span>
//         <span className="base-info-value">${team.teamChief || 'N/A'}</span>
//     </div>
//     <div className="base-info-item">
//         <span className="base-info-label">Technical Chief</span>
//         <span className="base-info-value">${team.technicalChief || 'N/A'}</span>
//     </div>
//     <div className="base-info-item">
//         <span className="base-info-label">Chassis</span>
//         <span className="base-info-value">${team.chassis || 'N/A'}</span>
//     </div>
//     <div className="base-info-item">
//         <span className="base-info-label">Power Unit</span>
//         <span className="base-info-value">${team.powerUnit || 'N/A'}</span>
//     </div>
// </div>
//
// <div className="hero-quick-stats">
//     <div className="quick-stat">
//         <span className="quick-stat-value">${team.position || 'N/A'}</span>
//         <span className="quick-stat-label">Position</span>
//     </div>
//     <div className="quick-stat">
//         <span className="quick-stat-value">${team.points || '0'}</span>
//         <span className="quick-stat-label">Points</span>
//     </div>
//     <div className="quick-stat">
//         <span className="quick-stat-value">${team.worldChampionships || '0'}</span>
//         <span className="quick-stat-label">Championships</span>
//     </div>
// </div>