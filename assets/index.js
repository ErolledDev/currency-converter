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
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return new Date(date).toLocaleDateString(undefined, options);
}

const API_BASE_URL = "https://api.frankfurter.dev/v1";

async function fetchExchangeRates(base = "USD") {
    const timestamp = new Date().getTime();
    const response = await fetch(`${API_BASE_URL}/latest?base=${base}&_=${timestamp}`, {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch exchange rates: ${response.status}`);
    }

    const data = await response.json();
    return {
        base: data.base,
        date: data.date,
        rates: data.rates
    };
}

function calculateExchangeRate(amount, baseRate, targetRate) {
    if (typeof amount !== 'number' || isNaN(amount) || typeof targetRate !== 'number' || targetRate <= 0) {
        return 0;
    }
    return (amount / baseRate) * targetRate;
}

function updateURLParams({ amount, from, to }) {
    const url = new URL(window.location);
    url.searchParams.set('amount', amount);
    url.searchParams.set('from', from);
    url.searchParams.set('to', to);
    window.history.pushState({}, '', url);
}

function loadURLParams() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('amount')) {
        document.getElementById('amount').value = params.get('amount');
    }
    if (params.has('from')) {
        document.getElementById('fromCurrency').value = params.get('from');
    }
    if (params.has('to')) {
        document.getElementById('toCurrency').value = params.get('to');
    }
}

function initializeHeroSection() {
    const container = document.getElementById('hero-container');
    container.innerHTML = `
        <section class="hero">
            <div class="hero-content">
                <h2>Free Currency Converter</h2>
                <p>Get real-time exchange rates and convert between 170+ world currencies instantly</p>
                
                <div class="converter-card">
                    <div class="last-update"></div>
                    <div class="converter-form">
                        <div class="input-group">
                            <input type="number" id="amount" value="1" min="0" step="any" aria-label="Amount to convert">
                            <select id="fromCurrency" aria-label="Convert from currency">
                                <option value="USD">USD</option>
                            </select>
                        </div>
                        
                        <button id="swap-currencies" class="swap-btn" aria-label="Swap currencies">
                            <i class="fas fa-exchange-alt"></i>
                        </button>
                        
                        <div class="input-group">
                            <input type="number" id="result" readonly aria-label="Conversion result">
                            <select id="toCurrency" aria-label="Convert to currency">
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                    </div>
                    
                    <button id="convert" class="convert-btn">Convert Now</button>
                    <p id="rate-info" class="rate-info"></p>
                </div>
            </div>
        </section>
    `;
}

function initializeFeaturesSection() {
    const container = document.getElementById('features-container');
    container.innerHTML = `
        <section class="features">
            <div class="container">
                <div class="section-title">
                    <h2>Why Use Our Converter?</h2>
                    <p>Simple, fast, and reliable currency conversion at your fingertips</p>
                </div>
                <div class="features-grid">
                    <div class="feature-card">
                        <i class="fas fa-bolt"></i>
                        <h3>Real-Time Rates</h3>
                        <p>Get up-to-the-minute exchange rates for all major world currencies</p>
                    </div>
                    
                    <div class="feature-card">
                        <i class="fas fa-chart-line"></i>
                        <h3>Historical Data</h3>
                        <p>Access historical exchange rates and track currency trends over time</p>
                    </div>
                    
                    <div class="feature-card">
                        <i class="fas fa-globe"></i>
                        <h3>170+ Currencies</h3>
                        <p>Support for over 170 world currencies with accurate conversion rates</p>
                    </div>
                    
                    <div class="feature-card">
                        <i class="fas fa-shield-alt"></i>
                        <h3>Secure & Free</h3>
                        <p>100% secure and free to use, with no hidden fees or charges</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function initializePopularConversions() {
    const container = document.getElementById('popular-conversions');
    container.innerHTML = `
        <section class="popular-conversions">
            <div class="container">
                <div class="section-title">
                    <h2>Popular Currency Conversions</h2>
                    <p>Quick access to commonly used currency pairs</p>
                </div>
                <div class="conversion-grid">
                    <div class="conversion-card">
                        <h3>USD to EUR</h3>
                        <p>United States Dollar to Euro</p>
                    </div>
                    <div class="conversion-card">
                        <h3>EUR to GBP</h3>
                        <p>Euro to British Pound</p>
                    </div>
                    <div class="conversion-card">
                        <h3>USD to JPY</h3>
                        <p>United States Dollar to Japanese Yen</p>
                    </div>
                    <div class="conversion-card">
                        <h3>GBP to USD</h3>
                        <p>British Pound to United States Dollar</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function initializeWhyChooseUs() {
    const container = document.getElementById('why-choose-us');
    container.innerHTML = `
        <section class="why-choose-us">
            <div class="container">
                <div class="section-title">
                    <h2>Why Choose Our Currency Converter?</h2>
                    <p>The most reliable and user-friendly currency converter available</p>
                </div>
                <div class="reasons-grid">
                    <div class="reason-card">
                        <i class="fas fa-clock"></i>
                        <h3>Real-Time Updates</h3>
                        <p>Our exchange rates are updated in real-time, ensuring you always get the most accurate conversions.</p>
                    </div>
                    <div class="reason-card">
                        <i class="fas fa-check-circle"></i>
                        <h3>Accuracy Guaranteed</h3>
                        <p>We source our rates from reliable financial institutions to provide the most accurate conversions.</p>
                    </div>
                    <div class="reason-card">
                        <i class="fas fa-user-shield"></i>
                        <h3>100% Free</h3>
                        <p>No hidden fees, no subscriptions - just free, reliable currency conversion whenever you need it.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function initializeFAQSection() {
    const container = document.getElementById('faq-section');
    container.innerHTML = `
        <section class="faq-section">
            <div class="container">
                <div class="section-title">
                    <h2>Frequently Asked Questions</h2>
                    <p>Find answers to common questions about our currency converter</p>
                </div>
                <div class="faq-grid">
                    <div class="faq-item">
                        <div class="faq-question">
                            How accurate are your exchange rates?
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            Our exchange rates are sourced from reliable financial data providers and updated in real-time to ensure maximum accuracy.
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            How often are the rates updated?
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            Exchange rates are updated every minute during market hours to provide you with the most current rates available.
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">
                            Is this service really free?
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            Yes! Our currency converter is completely free to use with no hidden fees or charges.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Add FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

function initializeCTASection() {
    const container = document.getElementById('cta-section');
    container.innerHTML = `
        <section class="cta-section">
            <div class="container">
                <div class="cta-content">
                    <h2>Start Converting Currencies Now</h2>
                    <p>Get accurate currency conversions with real-time exchange rates - completely free!</p>
                    <div class="cta-buttons">
                        <a href="#" class="cta-btn cta-btn-primary">Start Converting</a>
                        <a href="/about" class="cta-btn cta-btn-secondary">Learn More</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function initializeFooter() {
    const container = document.getElementById('footer-container');
    container.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h4>Currency Exchange</h4>
                        <ul>
                            <li><a href="/">Currency Converter</a></li>
                            <li><a href="/historical-rates">Historical Rates</a></li>
                            <li><a href="/currency-charts">Currency Charts</a></li>
                            <li><a href="/api">API Access</a></li>
                        </ul>
                    </div>
                    
                
                    
                    <div class="footer-section">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="/news">Currency News</a></li>
                            <li><a href="/glossary">Currency Glossary</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/blog">Blog</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/careers">Careers</a></li>
                            <li><a href="/press">Press</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/security">Security</a></li>
                            <li><a href="/compliance">Compliance</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Currency Exchange. All rights reserved.</p>
                </div>
            </div>
        </footer>
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
        if (!initialRates || !initialRates.rates || typeof initialRates.rates !== 'object') {
            throw new Error('Invalid exchange rates data');
        }

        // Populate currency dropdowns
        fromCurrency.innerHTML = '';
        toCurrency.innerHTML = '';
        Object.keys(initialRates.rates).forEach(currency => {
            fromCurrency.add(new Option(currency, currency));
            toCurrency.add(new Option(currency, currency));
        });
        fromCurrency.add(new Option(initialRates.base, initialRates.base));
        toCurrency.add(new Option(initialRates.base, initialRates.base));

        // Set default values
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

                if (!rates || !rates.rates || typeof rates.rates !== 'object') {
                    throw new Error('Invalid exchange rates data');
                }

                const targetRate = toCurrency.value === rates.base ? 1 : rates.rates[toCurrency.value];
                if (targetRate === undefined && toCurrency.value !== rates.base) {
                    throw new Error(`Exchange rate not available for ${toCurrency.value}`);
                }

                const convertedAmount = calculateExchangeRate(
                    parseFloat(amount.value) || 0,
                    1,
                    toCurrency.value === rates.base ? 1 : targetRate
                );

                result.value = convertedAmount.toFixed(2);
                rateInfo.textContent = `1 ${fromCurrency.value} = ${(toCurrency.value === rates.base ? 1 : targetRate).toFixed(4)} ${toCurrency.value}`;

                const updateTime = new Date();
                lastUpdate.textContent = `Last updated: ${formatDate(updateTime)}`;

                updateURLParams({
                    amount: amount.value,
                    from: fromCurrency.value,
                    to: toCurrency.value
                });

            } catch (error) {
                console.error('Conversion error:', error);
                rateInfo.textContent = error.message || 'Error performing conversion. Please try again.';
                result.value = '';
                lastUpdate.textContent = '';
            }
        }

        // Event listeners
        convertButton.addEventListener('click', () => performConversion(true));
        amount.addEventListener('input', () => performConversion(false));
        fromCurrency.addEventListener('change', () => performConversion(true));
        toCurrency.addEventListener('change', () => performConversion(true));
        
        swapButton.addEventListener('click', () => {
            const tempCurrency = fromCurrency.value;
            fromCurrency.value = toCurrency.value;
            toCurrency.value = tempCurrency;
            performConversion(true);
        });

        // Auto-update rates periodically
        setInterval(() => performConversion(true), REFRESH_INTERVAL);

        // Initial conversion
        await performConversion(true);

    } catch (error) {
        console.error('Initialization error:', error);
        rateInfo.textContent = error.message || 'Error loading exchange rates. Please refresh the page.';
        lastUpdate.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeHeroSection();
    initializeFeaturesSection();
    initializePopularConversions();
    initializeWhyChooseUs();
    initializeFAQSection();
    initializeCTASection();
    initializeFooter();
    loadURLParams();
    initializeConverter();
});