import {API_CONFIG} from "../../shared/config.js";

export function createHeader() {
    const header = document.createElement('header');
    header.className = 'f1-header';

    const f1logoPath = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.backgroundImages}logoF1.png`;
    header.innerHTML = `
        <nav class="f1-nav">
            <div class="nav-container">
                <a href="../../pages/allDrivers/index.html" class="logo">
                    <img src="${f1logoPath}"
                        alt="F1 logo"
                        class="f1logo"
                        loading="lazy"
                        onerror="console.error('Image failed to load:', '${f1logoPath}'); this.style.opacity='0.1'"
                        onload="console.log('Image loaded:', '${f1logoPath}')">
                   
                </a>
                
                <ul class="nav-links">
                    <li><a href="../../pages/allDrivers/index.html" class="nav-link">Home</a></li>
                    <li><a href="../../pages/allDrivers/index.html" class="nav-link">Drivers</a></li>
                    <li><a href="/src/pages/teams/" class="nav-link">Teams</a></li>
                    <li><a href="/src/pages/schedule/" class="nav-link">Schedule</a></li>
                    <li><a href="/src/pages/results/" class="nav-link">Results</a></li>
                </ul>
                
                <button class="mobile-toggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    `;

    // Add mobile menu toggle functionality
    const mobileToggle = header.querySelector('.mobile-toggle');
    const navLinks = header.querySelector('.nav-links');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Highlight active page
    highlightActivePage(header);

    return header;
}

function highlightActivePage(header) {
    const currentPath = window.location.pathname;
    const links = header.querySelectorAll('.nav-link');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/') {
            link.classList.add('active');
        }
    });
}

// Initialize header on page load
export function initHeader() {
    const header = createHeader();
    document.body.prepend(header);
}