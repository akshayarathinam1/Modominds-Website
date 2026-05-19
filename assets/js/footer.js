/**
 * footer.js — Modo Minds Shared Footer Injector
 *
 * Injects the shared footer HTML into the current page.
 * Styles are defined in assets/css/style.css (footer section).
 * Place <script src="footer.js"></script> just before </body>.
 */
(function () {

  /* ─── Coming Soon Section HTML ─── */
  var comingSoonHTML = `
<!-- ═══ COMING SOON SECTION ═══ -->
<section class="coming-soon-section" aria-label="Coming Soon">
  <div class="cs-bg-orb cs-orb-1" aria-hidden="true"></div>
  <div class="cs-bg-orb cs-orb-2" aria-hidden="true"></div>

  <div class="cs-inner">
    <div class="cs-badge">
      <span class="cs-badge-dot"></span>
      What's Next
    </div>
    <h2 class="cs-heading">Something <span class="cs-gradient-text">Exciting</span> Is Coming</h2>
    <p class="cs-subtext">
      We're working on new services and features that will take your brand to the next level.
      Stay tuned — the best is yet to come.
    </p>

    <div class="cs-cards-row">
      <div class="cs-card">
        <div class="cs-card-icon"><i class="fa-solid fa-globe"></i></div>
        <div class="cs-card-label">Web &amp; App Design</div>
        <div class="cs-card-status">Q3 2025</div>
      </div>
      <div class="cs-card">
        <div class="cs-card-icon"><i class="fa-solid fa-robot"></i></div>
        <div class="cs-card-label">AI-Powered Tools</div>
        <div class="cs-card-status">Q4 2025</div>
      </div>
      <div class="cs-card">
        <div class="cs-card-icon"><i class="fa-solid fa-chart-line"></i></div>
        <div class="cs-card-label">Growth Analytics</div>
        <div class="cs-card-status">Q1 2026</div>
      </div>
    </div>

    <a href="mailto:hello@modominds.com" class="cs-notify-btn">
      <i class="fa-solid fa-bell"></i>
      Get Notified Early
    </a>
  </div>
</section>`;

  /* ─── Footer HTML ─── */
  var footerHTML = `
<!-- ═══ FOOTER ═══ -->
<footer>
  <div class="footer-grid">

    <!-- Brand col -->
    <div class="footer-brand">
      <a href="/" class="footer-logo" aria-label="Modo Minds home">
        <img src="assets/logo/Logo-Finalized-1.0.png" alt="Modo Minds logo" />
      </a>
      <p class="footer-tagline">
        We turn bold ideas into digital realities — branding, web, and AI-powered growth.
      </p>
      <div class="footer-social" aria-label="Social media links">
        <a href="https://www.instagram.com/modominds_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/company/modominds/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i class="fa-brands fa-linkedin-in"></i>
        </a>
        <a href="https://wa.me/916362722448" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <i class="fa-brands fa-whatsapp"></i>
        </a>
        <a href="mailto:hello@modominds.com" aria-label="Email us">
          <i class="fa-solid fa-envelope"></i>
        </a>
      </div>
    </div>

    <!-- Services col -->
    <div class="footer-col">
      <h5 class="footer-heading">Services</h5>
      <ul class="footer-links">
        <li><a href="/#services">Brand Strategy</a></li>
        <li><a href="/#services">UI/UX Design</a></li>
        <li><a href="/#services">Web Development</a></li>
        <li><a href="/#services">AI Integration</a></li>
        <li><a href="/#services">Content Creation</a></li>
        <li><a href="/#services">Performance Marketing</a></li>
      </ul>
    </div>

    <!-- Studio col -->
    <div class="footer-col">
      <h5 class="footer-heading">Studio</h5>
      <ul class="footer-links">
        <li><a href="studio.html">Our Studio</a></li>
        <li><a href="studio.html#framework">Creative Framework</a></li>
        <li><a href="studio.html#process">Our Process</a></li>
        <li><a href="studio.html#work">Portfolio</a></li>
      </ul>
    </div>

    <!-- Contact col -->
    <div class="footer-col">
      <h5 class="footer-heading">Contact</h5>
      <ul class="footer-links">
        <li><a href="mailto:hello@modominds.com">hello@modominds.com</a></li>
        <li><a href="https://wa.me/916362722448" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></li>
        <li><a href="/#contact">Free Strategy Session</a></li>
        <li style="margin-top: 12px; font-size: 0.8rem; color: #9B8A8A; line-height: 1.5; list-style: none;"><i class="fa-solid fa-location-dot" style="color: #F24855; margin-right: 6px;"></i>5/2406, Plot No. 69, VA2, Annur Tech Park, Velmayil Garden, Annur, Pogalur, Coimbatore, Tamil Nadu 641 697</li>
      </ul>
    </div>

  </div>

  <!-- Bottom bar -->
  <div class="footer-bottom">
    <p>&copy; <span id="footer-year"></span> Modo Minds. All rights reserved.</p>
    <p>Designed by <a href="https://modominds.com/" target="_blank" rel="noopener noreferrer">Modo Minds</a></p>
  </div>
</footer>`;

  /* ─── Inject coming soon before </body> (conditionally) ─── */
  var path = window.location.pathname;
  var isUpcomingPage = path.includes('aienablement.html') || 
                       path.includes('aiagents.html') || 
                       path.includes('workflowautomation.html') || 
                       path.includes('customisedai.html') || 
                       path.includes('portfolio.html');
                       
  if (!isUpcomingPage) {
    document.body.insertAdjacentHTML('beforeend', comingSoonHTML);
  }

  /* ─── Inject footer before </body> ─── */
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  /* ─── Auto-update copyright year ─── */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ─── Animate Coming Soon cards on scroll ─── */
  var csSection = document.querySelector('.coming-soon-section');
  if (csSection && window.IntersectionObserver) {
    var csObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('cs-visible');
          csObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    csObs.observe(csSection);
  } else if (csSection) {
    csSection.classList.add('cs-visible');
  }

})();
