export function initializeFooter() {
    const footer = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Currency Converter</a></li>
                        <li><a href="#popular-pairs">Popular Pairs</a></li>
                        <li><a href="#top-currencies">Top Currencies</a></li>
                        <li><a href="#markets">Markets</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="#help">Help Center</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#glossary">Currency Glossary</a></li>
                        <li><a href="#news">Latest News</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="/pages/about.html">About Us</a></li>
                        <li><a href="/pages/contact.html">Contact</a></li>
                        <li><a href="/pages/privacy.html">Privacy Policy</a></li>
                        <li><a href="/pages/terms.html">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Connect With Us</h3>
                    <div class="social-links">
                        <a href="#" class="social-link"><span class="material-icons">facebook</span></a>
                        <a href="#" class="social-link"><span class="material-icons">twitter</span></a>
                        <a href="#" class="social-link"><span class="material-icons">linkedin</span></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Currency Exchange. All rights reserved.</p>
            </div>
        </div>
    `;

    document.querySelector('.footer').innerHTML = footer;
}