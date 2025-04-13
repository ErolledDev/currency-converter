import { API_BASE_URL } from '../script.js';

// Header component
export function initializeHeader() {
    const header = `
        <div class="container">
            <div class="logo">
                <h1><span class="material-icons">currency_exchange</span> Currency Exchange</h1>
            </div>
            <nav class="nav">
                <ul>
                    <li><a href="/" class="active">Converter</a></li>
                    <li><a href="#popular-pairs" class="has-mega-menu">Popular Pairs</a></li>
                    <li><a href="#top-currencies">Top Currencies</a></li>
                    <li><a href="#markets">Markets</a></li>
                    <li><a href="#news">News</a></li>
                </ul>
            </nav>
            <button class="menu-toggle" aria-label="Menu">
                <span class="material-icons">menu</span>
            </button>
        </div>
        <div class="mega-menu">
            <div class="mega-menu-container">
                <div class="mega-menu-section">
                    <h3>Popular USD Pairs</h3>
                    <ul class="mega-menu-list">
                        <li>
                            <a href="/assets/pages/converter/usd-eur.html">
                                USD to EUR
                                <span class="rate" data-from="USD" data-to="EUR"></span>
                            </a>
                        </li>
                        <li>
                            <a href="/assets/pages/converter/usd-jpy.html">
                                USD to JPY
                                <span class="rate" data-from="USD" data-to="JPY"></span>
                            </a>
                        </li>
                        <li>
                            <a href="/assets/pages/converter/usd-gbp.html">
                                USD to GBP
                                <span class="rate" data-from="USD" data-to="GBP"></span>
                            </a>
                        </li>
                        <li>
                            <a href="/assets/pages/converter/usd-php.html">
                                USD to PHP
                                <span class="rate" data-from="USD" data-to="PHP"></span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="mega-menu-section">
                    <h3>Popular EUR Pairs</h3>
                    <ul class="mega-menu-list">
                        <li>
                            <a href="/assets/pages/converter/eur-usd.html">
                                EUR to USD
                                <span class="rate" data-from="EUR" data-to="USD"></span>
                            </a>
                        </li>
                        <li>
                            <a href="/assets/pages/converter/eur-gbp.html">
                                EUR to GBP
                                <span class="rate" data-from="EUR" data-to="GBP"></span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="mega-menu-section">
                    <h3>Asian Currencies</h3>
                    <ul class="mega-menu-list">
                        <li>
                            <a href="/assets/pages/converter/jpy-usd.html">
                                JPY to USD
                                <span class="rate" data-from="JPY" data-to="USD"></span>
                            </a>
                        </li>
                        <li>
                            <a href="/assets/pages/converter/cny-usd.html">
                                CNY to USD
                                <span class="rate" data-from="CNY" data-to="USD"></span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="mega-menu-section">
                    <h3>Latest Updates</h3>
                    <ul class="mega-menu-list">
                        <li><a href="#news">Currency Market News</a></li>
                        <li><a href="#analysis">Market Analysis</a></li>
                        <li><a href="#forecasts">Exchange Rate Forecasts</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.header').innerHTML = header;
    initializeMobileMenu();
    initializeMegaMenu();
}

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const megaMenu = document.querySelector('.mega-menu');
    const hasMegaMenu = document.querySelector('.has-mega-menu');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.querySelector('.material-icons').textContent = 
            nav.classList.contains('active') ? 'close' : 'menu';
        
        // Close mega menu when closing mobile menu
        if (!nav.classList.contains('active')) {
            megaMenu.classList.remove('active');
        }
    });

    // Handle mega menu on mobile
    if (window.innerWidth <= 768) {
        hasMegaMenu.addEventListener('click', (e) => {
            e.preventDefault();
            megaMenu.classList.toggle('active');
        });
    }

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header')) {
            nav.classList.remove('active');
            megaMenu.classList.remove('active');
            menuToggle.querySelector('.material-icons').textContent = 'menu';
        }
    });
}

function initializeMegaMenu() {
    const megaMenuTrigger = document.querySelector('.has-mega-menu');
    const megaMenu = document.querySelector('.mega-menu');

    // Only use hover for desktop
    if (window.innerWidth > 768) {
        megaMenuTrigger.addEventListener('mouseenter', () => {
            megaMenu.classList.add('active');
        });

        megaMenu.addEventListener('mouseleave', () => {
            megaMenu.classList.remove('active');
        });
    }

    updateMegaMenuRates();
    setInterval(updateMegaMenuRates, 60000);
}

async function updateMegaMenuRates() {
    try {
        const response = await fetch(`${API_BASE_URL}/latest?from=USD`);
        const data = await response.json();

        document.querySelectorAll('.rate').forEach(rateElement => {
            const from = rateElement.dataset.from;
            const to = rateElement.dataset.to;
            
            if (from === 'USD') {
                rateElement.textContent = `${data.rates[to]?.toFixed(2) || 'N/A'} ${to}`;
            }
        });
    } catch (error) {
        console.error('Error updating mega menu rates:', error);
    }
}