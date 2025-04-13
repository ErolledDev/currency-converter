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
                    <h3>Major Pairs</h3>
                    <ul class="mega-menu-list">
                        <li><a href="/assets/pages/converter/usd-eur.html">USD to EUR<span class="rate" data-from="USD" data-to="EUR"></span></a></li>
                        <li><a href="/assets/pages/converter/eur-usd.html">EUR to USD<span class="rate" data-from="EUR" data-to="USD"></span></a></li>
                        <li><a href="/assets/pages/converter/gbp-usd.html">GBP to USD<span class="rate" data-from="GBP" data-to="USD"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-jpy.html">USD to JPY<span class="rate" data-from="USD" data-to="JPY"></span></a></li>
                        <li><a href="/assets/pages/converter/eur-gbp.html">EUR to GBP<span class="rate" data-from="EUR" data-to="GBP"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-chf.html">USD to CHF<span class="rate" data-from="USD" data-to="CHF"></span></a></li>
                        <li><a href="/assets/pages/converter/aud-usd.html">AUD to USD<span class="rate" data-from="AUD" data-to="USD"></span></a></li>
                        <li><a href="/assets/pages/converter/nzd-usd.html">NZD to USD<span class="rate" data-from="NZD" data-to="USD"></span></a></li>
                    </ul>
                </div>
                <div class="mega-menu-section">
                    <h3>European Pairs</h3>
                    <ul class="mega-menu-list">
                        <li><a href="/assets/pages/converter/eur-chf.html">EUR to CHF<span class="rate" data-from="EUR" data-to="CHF"></span></a></li>
                        <li><a href="/assets/pages/converter/gbp-eur.html">GBP to EUR<span class="rate" data-from="GBP" data-to="EUR"></span></a></li>
                        <li><a href="/assets/pages/converter/eur-sek.html">EUR to SEK<span class="rate" data-from="EUR" data-to="SEK"></span></a></li>
                        <li><a href="/assets/pages/converter/eur-nok.html">EUR to NOK<span class="rate" data-from="EUR" data-to="NOK"></span></a></li>
                        <li><a href="/assets/pages/converter/eur-pln.html">EUR to PLN<span class="rate" data-from="EUR" data-to="PLN"></span></a></li>
                        <li><a href="/assets/pages/converter/eur-czk.html">EUR to CZK<span class="rate" data-from="EUR" data-to="CZK"></span></a></li>
                        <li><a href="/assets/pages/converter/eur-huf.html">EUR to HUF<span class="rate" data-from="EUR" data-to="HUF"></span></a></li>
                        <li><a href="/assets/pages/converter/eur-ron.html">EUR to RON<span class="rate" data-from="EUR" data-to="RON"></span></a></li>
                    </ul>
                </div>
                <div class="mega-menu-section">
                    <h3>Asian Pairs</h3>
                    <ul class="mega-menu-list">
                        <li><a href="/assets/pages/converter/usd-cny.html">USD to CNY<span class="rate" data-from="USD" data-to="CNY"></span></a></li>
                        <li><a href="/assets/pages/converter/jpy-usd.html">JPY to USD<span class="rate" data-from="JPY" data-to="USD"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-sgd.html">USD to SGD<span class="rate" data-from="USD" data-to="SGD"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-hkd.html">USD to HKD<span class="rate" data-from="USD" data-to="HKD"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-krw.html">USD to KRW<span class="rate" data-from="USD" data-to="KRW"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-thb.html">USD to THB<span class="rate" data-from="USD" data-to="THB"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-myr.html">USD to MYR<span class="rate" data-from="USD" data-to="MYR"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-php.html">USD to PHP<span class="rate" data-from="USD" data-to="PHP"></span></a></li>
                    </ul>
                </div>
                <div class="mega-menu-section">
                    <h3>Other Popular Pairs</h3>
                    <ul class="mega-menu-list">
                        <li><a href="/assets/pages/converter/usd-cad.html">USD to CAD<span class="rate" data-from="USD" data-to="CAD"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-mxn.html">USD to MXN<span class="rate" data-from="USD" data-to="MXN"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-brl.html">USD to BRL<span class="rate" data-from="USD" data-to="BRL"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-zar.html">USD to ZAR<span class="rate" data-from="USD" data-to="ZAR"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-inr.html">USD to INR<span class="rate" data-from="USD" data-to="INR"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-try.html">USD to TRY<span class="rate" data-from="USD" data-to="TRY"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-ils.html">USD to ILS<span class="rate" data-from="USD" data-to="ILS"></span></a></li>
                        <li><a href="/assets/pages/converter/usd-rub.html">USD to RUB<span class="rate" data-from="USD" data-to="RUB"></span></a></li>
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
        
        if (!nav.classList.contains('active')) {
            megaMenu.classList.remove('active');
        }
    });

    if (window.innerWidth <= 768) {
        hasMegaMenu.addEventListener('click', (e) => {
            e.preventDefault();
            megaMenu.classList.toggle('active');
        });
    }

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