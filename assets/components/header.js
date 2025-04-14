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
                        <li><a href="/assets/pages/converter/usd-eur.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to EUR
                                <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="EUR"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/eur-usd.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="flag-icon">
                                EUR to USD
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                            </span>
                            <span class="rate" data-from="EUR" data-to="USD"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/gbp-usd.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/gb.png" alt="GBP" class="flag-icon">
                                GBP to USD
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                            </span>
                            <span class="rate" data-from="GBP" data-to="USD"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-jpy.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to JPY
                                <img src="https://flagcdn.com/w20/jp.png" alt="JPY" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="JPY"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/eur-gbp.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="flag-icon">
                                EUR to GBP
                                <img src="https://flagcdn.com/w20/gb.png" alt="GBP" class="flag-icon">
                            </span>
                            <span class="rate" data-from="EUR" data-to="GBP"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-chf.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to CHF
                                <img src="https://flagcdn.com/w20/ch.png" alt="CHF" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="CHF"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/aud-usd.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/au.png" alt="AUD" class="flag-icon">
                                AUD to USD
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                            </span>
                            <span class="rate" data-from="AUD" data-to="USD"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/nzd-usd.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/nz.png" alt="NZD" class="flag-icon">
                                NZD to USD
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                            </span>
                            <span class="rate" data-from="NZD" data-to="USD"></span>
                        </a></li>
                    </ul>
                </div>
                <div class="mega-menu-section">
                    <h3>European Pairs</h3>
                    <ul class="mega-menu-list">
                        <li><a href="/assets/pages/converter/eur-chf.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="flag-icon">
                                EUR to CHF
                                <img src="https://flagcdn.com/w20/ch.png" alt="CHF" class="flag-icon">
                            </span>
                            <span class="rate" data-from="EUR" data-to="CHF"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/gbp-eur.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/gb.png" alt="GBP" class="flag-icon">
                                GBP to EUR
                                <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="flag-icon">
                            </span>
                            <span class="rate" data-from="GBP" data-to="EUR"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/eur-sek.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="flag-icon">
                                EUR to SEK
                                <img src="https://flagcdn.com/w20/se.png" alt="SEK" class="flag-icon">
                            </span>
                            <span class="rate" data-from="EUR" data-to="SEK"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/eur-nok.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="flag-icon">
                                EUR to NOK
                                <img src="https://flagcdn.com/w20/no.png" alt="NOK" class="flag-icon">
                            </span>
                            <span class="rate" data-from="EUR" data-to="NOK"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/eur-pln.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="flag-icon">
                                EUR to PLN
                                <img src="https://flagcdn.com/w20/pl.png" alt="PLN" class="flag-icon">
                            </span>
                            <span class="rate" data-from="EUR" data-to="PLN"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/eur-czk.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="flag-icon">
                                EUR to CZK
                                <img src="https://flagcdn.com/w20/cz.png" alt="CZK" class="flag-icon">
                            </span>
                            <span class="rate" data-from="EUR" data-to="CZK"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/eur-huf.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="flag-icon">
                                EUR to HUF
                                <img src="https://flagcdn.com/w20/hu.png" alt="HUF" class="flag-icon">
                            </span>
                            <span class="rate" data-from="EUR" data-to="HUF"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/eur-ron.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="flag-icon">
                                EUR to RON
                                <img src="https://flagcdn.com/w20/ro.png" alt="RON" class="flag-icon">
                            </span>
                            <span class="rate" data-from="EUR" data-to="RON"></span>
                        </a></li>
                    </ul>
                </div>
                <div class="mega-menu-section">
                    <h3>Asian Pairs</h3>
                    <ul class="mega-menu-list">
                        <li><a href="/assets/pages/converter/usd-cny.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to CNY
                                <img src="https://flagcdn.com/w20/cn.png" alt="CNY" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="CNY"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/jpy-usd.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/jp.png" alt="JPY" class="flag-icon">
                                JPY to USD
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                            </span>
                            <span class="rate" data-from="JPY" data-to="USD"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-sgd.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to SGD
                                <img src="https://flagcdn.com/w20/sg.png" alt="SGD" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="SGD"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-hkd.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to HKD
                                <img src="https://flagcdn.com/w20/hk.png" alt="HKD" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="HKD"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-krw.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to KRW
                                <img src="https://flagcdn.com/w20/kr.png" alt="KRW" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="KRW"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-thb.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to THB
                                <img src="https://flagcdn.com/w20/th.png" alt="THB" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="THB"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-myr.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to MYR
                                <img src="https://flagcdn.com/w20/my.png" alt="MYR" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="MYR"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-php.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to PHP
                                <img src="https://flagcdn.com/w20/ph.png" alt="PHP" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="PHP"></span>
                        </a></li>
                    </ul>
                </div>
                <div class="mega-menu-section">
                    <h3>Other Popular Pairs</h3>
                    <ul class="mega-menu-list">
                        <li><a href="/assets/pages/converter/usd-cad.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to CAD
                                <img src="https://flagcdn.com/w20/ca.png" alt="CAD" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="CAD"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-mxn.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to MXN
                                <img src="https://flagcdn.com/w20/mx.png" alt="MXN" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="MXN"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-brl.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to BRL
                                <img src="https://flagcdn.com/w20/br.png" alt="BRL" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="BRL"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-zar.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to ZAR
                                <img src="https://flagcdn.com/w20/za.png" alt="ZAR" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="ZAR"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-inr.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to INR
                                <img src="https://flagcdn.com/w20/in.png" alt="INR" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="INR"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-try.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to TRY
                                <img src="https://flagcdn.com/w20/tr.png" alt="TRY" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="TRY"></span>
                        </a></li>
                        <li><a href="/assets/pages/converter/usd-ils.html">
                            <span class="currency-pair">
                                <img src="https://flagcdn.com/w20/us.png" alt="USD" class="flag-icon">
                                USD to ILS
                                <img src="https://flagcdn.com/w20/il.png" alt="ILS" class="flag-icon">
                            </span>
                            <span class="rate" data-from="USD" data-to="ILS"></span>
                        </a></li>
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
        const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'NZD', 'CHF'];
        const rates = {};

        await Promise.all(currencies.map(async (currency) => {
            const response = await fetch(`${API_BASE_URL}/latest?from=${currency}`);
            const data = await response.json();
            rates[currency] = data.rates;
        }));

        document.querySelectorAll('.rate').forEach(rateElement => {
            const from = rateElement.dataset.from;
            const to = rateElement.dataset.to;
            
            if (rates[from] && rates[from][to]) {
                rateElement.textContent = ` (${rates[from][to].toFixed(2)})`;
            }
        });
    } catch (error) {
        console.error('Error updating mega menu rates:', error);
    }
}