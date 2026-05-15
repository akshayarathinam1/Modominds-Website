(function () {
  /* ─── STYLES ─────────────────────────────────────────────────────────── */
  var css = `
    footer{background:#2D1B1A;padding:72px 48px 40px;position:relative;z-index:1;}
    .footer-grid{max-width:1220px;margin:0 auto;display:grid;grid-template-columns:1.8fr 1fr 1fr 1fr 1fr;gap:40px;padding-bottom:52px;border-bottom:1px solid rgba(255,255,255,.07);margin-bottom:32px;}
    .footer-logo{display:block;margin-bottom:16px;text-decoration:none;}
    .footer-logo img{height:32px;width:auto;opacity:.88;filter:brightness(0) invert(1);}
    .footer-about{font-size:.875rem;color:rgba(255,255,255,.36);line-height:1.72;max-width:275px;}
    .footer-socials{display:flex;gap:8px;margin-top:22px;}
    .fsoc{width:34px;height:34px;border-radius:9px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.04);display:grid;place-items:center;font-size:.76rem;font-weight:700;color:rgba(255,255,255,.4);transition:background .2s,color .2s,border-color .2s;cursor:pointer;text-decoration:none;}
    .fsoc:hover{background:linear-gradient(135deg,#712A2E 0%,#B4474D 55%,#F24855 100%);color:#fff;border-color:transparent;}
    .footer-col h5{font-family:'Poppins',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:18px;}
    .footer-col ul{list-style:none;display:flex;flex-direction:column;gap:11px;padding:0;margin:0;}
    .footer-col ul a{font-size:.875rem;color:rgba(255,255,255,.36);transition:color .2s;text-decoration:none;}
    .footer-col ul a:hover{color:rgba(255,255,255,.82);}
    .footer-bottom{max-width:1220px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;font-size:.78rem;color:rgba(255,255,255,.24);flex-wrap:wrap;gap:12px;}
    .footer-bottom a{color:rgba(255,255,255,.24);transition:color .2s;text-decoration:none;}
    .footer-bottom a:hover{color:rgba(255,255,255,.55);}
    .footer-legal{display:flex;gap:20px;}

    @media(max-width:1024px){
      footer{padding:60px 24px 36px;}
      .footer-grid{grid-template-columns:1fr 1fr;gap:32px;}
    }
    @media(max-width:640px){
      footer{padding:48px 20px 32px;}
      .footer-grid{grid-template-columns:1fr;gap:28px;}
      .footer-bottom{flex-direction:column;align-items:flex-start;gap:8px;}
    }
  `;
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─── HTML ───────────────────────────────────────────────────────────── */
  var footerHTML = `
  <footer>
    <div class="footer-grid">
      <div>
        <a href="/" class="footer-logo" aria-label="Modo Minds">
          <img src="Logo-Finalized-1.0.png" alt="Modo Minds"/>
        </a>
        <p class="footer-about">We combine strategic thinking and AI-enabled systems to help businesses plan, execute, and optimise marketing, technology, and growth.</p>
        <div class="footer-socials">
          <a class="fsoc" href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a class="fsoc" href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a class="fsoc" href="#" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
          <a class="fsoc" href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Studio</h5>
        <ul>
          <li><a href="/studio/brand-identity">Brand Identity</a></li>
          <li><a href="/studio/shoot-production">Shoot &amp; Production</a></li>
          <li><a href="/studio/creative-strategy">Creative Strategy</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Growth Labs</h5>
        <ul>
          <li><a href="/growth/paid-ads">Paid Ads</a></li>
          <li><a href="/growth/seo">SEO</a></li>
          <li><a href="/growth/analytics">Analytics</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Product Labs</h5>
        <ul>
          <li><a href="/product/development">Product Dev</a></li>
          <li><a href="/product/website">Website</a></li>
          <li><a href="/product/applications">Applications</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="/#about">About Us</a></li>
          <li><a href="/portfolio">Portfolio</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2025 Modo Minds. All rights reserved.</span>
      <div class="footer-legal">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
      </div>
    </div>
  </footer>`;

  // Insert before closing body tag (or append if no script reference)
  var goTop = document.getElementById('go-top');
  if (goTop) {
    goTop.insertAdjacentHTML('beforebegin', footerHTML);
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
})();
