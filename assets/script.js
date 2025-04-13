const API_BASE_URL = "https://api.frankfurter.app";

function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    function updateActiveLink() {
        const hash = window.location.hash || '#converter';
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === hash);
        });
    }

    window.addEventListener('hashchange', updateActiveLink);
    updateActiveLink();
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

async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            return response;
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        }
    }
}

async function fetchExchangeRates(base = "USD") {
    try {
        const timestamp = new Date().getTime();
        const url = `${API_BASE_URL}/latest?from=${base}&_=${timestamp}`;
        const options = {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            },
            mode: 'cors',
            timeout: 5000
        };

        const response = await fetchWithRetry(url, options);
        const data = await response.json();

        if (!data || !data.rates) {
            throw new Error('Invalid response format from the exchange rate API');
        }

        return {
            base: data.base,
            date: data.date,
            rates: data.rates
        };
    } catch (error) {
        console.error('Fetch error:', error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            throw new Error('Network error: Please check your internet connection');
        }
        throw new Error(`Failed to fetch exchange rates: ${error.message}`);
    }
}

function calculateExchangeRate(amount, baseRate, targetRate) {
    if (typeof amount !== 'number' || isNaN(amount) || typeof targetRate !== 'number' || targetRate <= 0) {
        return 0;
    }
    return (amount / baseRate) * targetRate;
}

function getUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    return {
        amount: parseFloat(params.get('amount')) || 1,
        from: params.get('from')?.toUpperCase() || 'USD',
        to: params.get('to')?.toUpperCase() || 'EUR'
    };
}

function updateUrlParameters(amount, from, to) {
    const url = new URL(window.location.href);
    url.searchParams.set('amount', amount);
    url.searchParams.set('from', from);
    url.searchParams.set('to', to);
    window.history.replaceState({}, '', url);
}

function initializeHeroSection() {
    const container = document.getElementById('hero-container');
    container.innerHTML = `
        <section class="hero">
            <div class="container">
                <div class="hero-flex-container">
                    <div class="hero-content">
                        <h2>Convert Currencies in Real-Time</h2>
                        <p>Get accurate exchange rates for 170+ world currencies. Fast, reliable, and always up-to-date.</p>
                        <div class="features-list">
                            <div class="feature-item">
                                <span class="material-icons">check_circle</span>
                                <span>Real-time rates</span>
                            </div>
                            <div class="feature-item">
                                <span class="material-icons">check_circle</span>
                                <span>170+ currencies</span>
                            </div>
                            <div class="feature-item">
                                <span class="material-icons">check_circle</span>
                                <span>Free to use</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="converter-wrapper">
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
            </div>
        </section>
    `;

    initializeConverter();
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
    const REFRESH_INTERVAL = 60000;

    const urlParams = getUrlParameters();
    
    try {
        const initialRates = await fetchExchangeRates();
        
        fromCurrency.innerHTML = '';
        toCurrency.innerHTML = '';
        Object.keys(initialRates.rates).forEach(currency => {
            fromCurrency.add(new Option(currency, currency));
            toCurrency.add(new Option(currency, currency));
        });
        
        fromCurrency.add(new Option(initialRates.base, initialRates.base));
        toCurrency.add(new Option(initialRates.base, initialRates.base));
        
        amount.value = urlParams.amount;
        fromCurrency.value = urlParams.from;
        toCurrency.value = urlParams.to;

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

                updateUrlParameters(amount.value, fromCurrency.value, toCurrency.value);

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
});