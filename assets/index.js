function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    }).format(date);
}

const API_BASE_URL = "https://api.frankfurter.app";

async function fetchExchangeRates(base = "USD") {
    try {
        const timestamp = new Date().getTime();
        const response = await fetch(`${API_BASE_URL}/latest?from=${base}&_=${timestamp}`, {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch exchange rates (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        return {
            base: data.base,
            date: data.date,
            rates: data.rates
        };
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Unable to connect to exchange rate service. Please check your internet connection and try again.');
        }
        throw error;
    }
}

function calculateExchangeRate(amount, baseRate, targetRate) {
    if (typeof amount !== 'number' || isNaN(amount) || typeof targetRate !== 'number' || targetRate <= 0) {
        return 0;
    }
    return (amount / baseRate) * targetRate;
}

function initializeHeroSection() {
    const container = document.getElementById('hero-container');
    container.innerHTML = `
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <h2>Currency Converter</h2>
                    <p>Get real-time exchange rates for world currencies</p>
                    
                    <div class="converter-card">
                        <div class="last-update"></div>
                        <div class="converter-form">
                            <div class="input-group">
                                <input type="number" id="amount" value="1" min="0" step="any" aria-label="Amount" placeholder="Enter amount">
                                <select id="fromCurrency" aria-label="From currency"></select>
                            </div>
                            
                            <button id="swap-currencies" class="swap-btn" aria-label="Swap currencies">
                                <span class="material-icons">swap_vert</span>
                            </button>
                            
                            <div class="input-group">
                                <input type="number" id="result" readonly aria-label="Result" placeholder="Converted amount">
                                <select id="toCurrency" aria-label="To currency"></select>
                            </div>
                        </div>
                        
                        <button id="convert" class="convert-btn">
                            <span class="material-icons">currency_exchange</span>
                            Convert
                        </button>
                        <p id="rate-info" class="rate-info"></p>
                    </div>
                </div>
            </div>
        </section>
    `;

    initializeConverter();
}

function initializeFeaturesSection() {
    const container = document.getElementById('features-container');
    container.innerHTML = `
        <section class="features">
            <div class="container">
                <div class="features-grid">
                    <div class="feature-card">
                        <span class="material-icons">update</span>
                        <h3>Real-Time Data</h3>
                        <p>Get live exchange rates updated every minute</p>
                    </div>
                    
                    <div class="feature-card">
                        <span class="material-icons">public</span>
                        <h3>170+ Currencies</h3>
                        <p>Convert between major world currencies</p>
                    </div>
                    
                    <div class="feature-card">
                        <span class="material-icons">verified</span>
                        <h3>Reliable & Accurate</h3>
                        <p>Trusted data from leading financial sources</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

async function initializeConverter() {
    const amount = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const result = document.getElementById('result');
    const rateInfo = document.getElementById('rate-info');
    const swapButton = document.getElementById('swap-currencies');
    const convertButton = document.getElementById('convert');
    const lastUpdate = document.querySelector('.last-update');

    let lastFetchTimestamp = 0;
    const REFRESH_INTERVAL = 60000; // 1 minute

    try {
        const initialRates = await fetchExchangeRates();
        
        fromCurrency.innerHTML = '';
        toCurrency.innerHTML = '';
        Object.keys(initialRates.rates).forEach(currency => {
            fromCurrency.add(new Option(currency, currency));
            toCurrency.add(new Option(currency, currency));
        });
        
        // Add base currency to the list
        fromCurrency.add(new Option(initialRates.base, initialRates.base));
        toCurrency.add(new Option(initialRates.base, initialRates.base));
        
        fromCurrency.value = initialRates.base;
        toCurrency.value = Object.keys(initialRates.rates)[0];

        async function performConversion(forceUpdate = false) {
            try {
                const currentTime = Date.now();
                const shouldUpdate = forceUpdate || (currentTime - lastFetchTimestamp >= REFRESH_INTERVAL);

                let rates;
                if (shouldUpdate) {
                    rates = await fetchExchangeRates(fromCurrency.value);
                    lastFetchTimestamp = currentTime;
                } else {
                    rates = await fetchExchangeRates(fromCurrency.value);
                }

                const targetRate = toCurrency.value === rates.base ? 1 : rates.rates[toCurrency.value];
                if (targetRate === undefined) {
                    throw new Error(`Exchange rate not available for ${toCurrency.value}`);
                }

                const convertedAmount = calculateExchangeRate(
                    parseFloat(amount.value) || 0,
                    1,
                    targetRate
                );

                result.value = convertedAmount.toFixed(2);
                rateInfo.textContent = `1 ${fromCurrency.value} = ${targetRate.toFixed(4)} ${toCurrency.value}`;
                lastUpdate.textContent = `Last updated: ${formatDate(new Date())}`;

            } catch (error) {
                console.error('Conversion error:', error);
                rateInfo.textContent = error.message || 'Error performing conversion. Please try again.';
                result.value = '';
                lastUpdate.textContent = '';
            }
        }

        convertButton.addEventListener('click', () => performConversion(true));
        amount.addEventListener('input', () => performConversion(false));
        fromCurrency.addEventListener('change', () => performConversion(true));
        toCurrency.addEventListener('change', () => performConversion(true));
        
        swapButton.addEventListener('click', () => {
            [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
            performConversion(true);
        });

        setInterval(() => performConversion(true), REFRESH_INTERVAL);
        await performConversion(true);

    } catch (error) {
        console.error('Initialization error:', error);
        rateInfo.textContent = error.message || 'Error loading exchange rates. Please try again later.';
        lastUpdate.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeHeroSection();
    initializeFeaturesSection();
});