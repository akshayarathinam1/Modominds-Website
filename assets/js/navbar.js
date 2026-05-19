(function () {
  /* ─── STYLES ─────────────────────────────────────────────────────── */
  var css = `
    #nav{position:fixed;top:0;left:0;right:0;z-index:1000;height:68px;display:flex;align-items:center;padding:0 48px;gap:12px;background:rgba(255,255,255,.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid transparent;transition:border-color .3s,box-shadow .3s;}
    #nav.stuck{border-bottom-color:#EDE5E5;box-shadow:0 2px 28px rgba(113,42,46,.07);}

    .nav-logo{display:flex;align-items:center;flex-shrink:0;text-decoration:none;}
    .nav-logo img{height:32px;width:auto;display:block;}

    .nav-menu{display:flex;align-items:center;justify-content:center;gap:2px;list-style:none;flex:1;margin:0;padding:0;}
    .nav-item{position:relative;}
    .nav-btn{display:inline-flex;align-items:center;gap:4px;padding:8px 14px;font-family:'Poppins',sans-serif;font-size:.875rem;font-weight:500;color:#6B5757;border-radius:10px;border:none;background:none;cursor:pointer;transition:color .2s,background .2s;white-space:nowrap;text-decoration:none;}
    .nav-btn:hover,.nav-item:hover .nav-btn{color:#18100F;background:#FFF5F5;}
    .nav-chevron{width:11px;height:11px;opacity:.55;transition:transform .25s;flex-shrink:0;}
    .nav-item:hover .nav-chevron{transform:rotate(180deg);}

    .nav-drop{position:absolute;top:calc(100% + 10px);left:-8px;background:#fff;border:1px solid #EDE5E5;border-radius:16px;padding:8px;min-width:230px;box-shadow:0 20px 64px rgba(113,42,46,.13),0 4px 16px rgba(0,0,0,.05);opacity:0;pointer-events:none;transform:translateY(-8px) scale(.97);transform-origin:top left;transition:opacity .2s,transform .2s;list-style:none;margin:0;}
    .nav-item:hover .nav-drop{opacity:1;pointer-events:all;transform:translateY(0) scale(1);}
    .drop-a{display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:10px;transition:background .15s;text-decoration:none;}
    .drop-a:hover{background:#FFF5F5;}
    .drop-title{font-size:.875rem;font-weight:600;color:#2D1B1A;}
    .drop-sub{font-size:.75rem;color:#9B8A8A;margin-top:2px;}
    .drop-a:hover .drop-title{color:#B4474D;}

    .nav-cta{display:inline-flex;align-items:center;gap:7px;padding:9px 22px;background:linear-gradient(135deg,#712A2E 0%,#B4474D 55%,#F24855 100%);color:#fff;font-family:'Poppins',sans-serif;font-size:.875rem;font-weight:600;border-radius:999px;border:none;cursor:pointer;flex-shrink:0;white-space:nowrap;transition:opacity .2s,transform .2s,box-shadow .2s;box-shadow:0 4px 18px rgba(180,71,77,.32);text-decoration:none;}
    .nav-cta:hover{opacity:.92;transform:translateY(-1px);box-shadow:0 8px 30px rgba(180,71,77,.42);}

    /* Hamburger */
    .nav-hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;cursor:pointer;padding:8px;background:none;border:none;margin-left:auto;width:44px;height:44px;flex-shrink:0;border-radius:8px;transition:background .2s;}
    .nav-hamburger:hover{background:#FFF5F5;}
    .nav-hamburger span{display:block;width:22px;height:2px;background:#18100F;border-radius:2px;transition:transform .3s,opacity .3s;margin:0 auto;}
    .nav-hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
    .nav-hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}
    .nav-hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}

    /* Mobile overlay */
    #mm-overlay{position:fixed;top:68px;left:0;right:0;bottom:0;background:rgba(24,16,15,.45);z-index:999;opacity:0;pointer-events:none;transition:opacity .3s;}
    #mm-overlay.open{opacity:1;pointer-events:all;}

    /* Mobile panel */
    #mm-panel{position:absolute;top:0;left:0;right:0;background:#fff;padding:4px 0 16px;max-height:calc(100svh - 68px);overflow-y:auto;transform:translateY(-16px);transition:transform .3s cubic-bezier(.22,1,.36,1);box-shadow:0 8px 32px rgba(113,42,46,.12);border-radius:0 0 16px 16px;}
    #mm-overlay.open #mm-panel{transform:translateY(0);}

    /* Mobile items */
    .mm-item{border-bottom:1px solid #F5EFEF;}
    .mm-item:last-child{border-bottom:none;}
    .mm-hdr{display:flex;align-items:center;width:100%;font-family:'Poppins',sans-serif;font-size:1rem;font-weight:600;color:#18100F;background:none;border:none;cursor:pointer;text-align:left;text-decoration:none;transition:background .15s;}
    .mm-hdr:hover{background:#FFF9F9;}
    .mm-hdr-link{display:flex;align-items:center;flex:1;padding:14px 8px 14px 20px;color:#18100F;text-decoration:none;font-family:'Poppins',sans-serif;font-size:1rem;font-weight:600;transition:color .2s;}
    .mm-hdr-link:hover{color:#B4474D;}
    .mm-hdr-toggle{display:flex;align-items:center;justify-content:center;padding:14px 20px 14px 8px;background:none;border:none;cursor:pointer;border-left:1px solid #F0EAEA;}
    .mm-hdr-toggle:hover{background:#FFF5F5;}
    .mm-chevron{width:18px;height:18px;flex-shrink:0;opacity:.5;transition:transform .25s,opacity .25s;color:#6B5757;}
    .mm-item.open .mm-chevron{transform:rotate(180deg);opacity:1;color:#B4474D;}

    .mm-drop{display:none;padding:0 0 8px;background:#FAFAF9;border-top:1px solid #F0EAEA;}
    .mm-item.open .mm-drop{display:block;}
    .mm-drop-a{display:flex;flex-direction:column;padding:10px 20px 10px 32px;text-decoration:none;transition:background .15s;}
    .mm-drop-a:hover{background:#FFF0F0;}
    .mm-drop-title{font-size:.9rem;font-weight:600;color:#2D1B1A;}
    .mm-drop-sub{font-size:.78rem;color:#9B8A8A;margin-top:2px;}

    /* Mobile CTA */
    .mm-cta-wrap{padding:16px 20px 4px;}
    .mm-cta{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px 24px;background:linear-gradient(135deg,#712A2E 0%,#B4474D 55%,#F24855 100%);color:#fff;font-family:'Poppins',sans-serif;font-size:.95rem;font-weight:600;border-radius:999px;border:none;cursor:pointer;text-decoration:none;box-shadow:0 4px 18px rgba(180,71,77,.32);transition:opacity .2s,transform .2s;}
    .mm-cta:hover{opacity:.9;transform:translateY(-1px);}

    @media(max-width:1100px){
      #nav{padding:0 24px;}
      .nav-menu{display:none;}
      .nav-cta{display:none;}
      .nav-hamburger{display:flex;}
    }
    @media(max-width:480px){
      #nav{padding:0 16px;}
      .nav-logo img{height:26px;}
    }
  `;
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─── HTML ───────────────────────────────────────────────────────── */
  var navHTML = `
  <nav id="nav" aria-label="Main navigation">
    <a href="index.html" class="nav-logo" aria-label="Modo Minds home">
      <img src="assets/logo/Logo-Finalized-1.0.png" alt="Modo Minds"/>
    </a>

    <ul class="nav-menu" role="list">
      <li class="nav-item">
        <a class="nav-btn" href="studio.html">Studio
          <svg class="nav-chevron" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <ul class="nav-drop" role="menu">
          <li><a class="drop-a" href="brandidentity.html"><span class="drop-title">Brand Identity</span><span class="drop-sub">Visual language &amp; positioning</span></a></li>
          <li><a class="drop-a" href="shoot.html"><span class="drop-title">Shoot &amp; Production</span><span class="drop-sub">Photo, video &amp; creative assets</span></a></li>
          <li><a class="drop-a" href="creativestrategy.html"><span class="drop-title">Creative Strategy</span><span class="drop-sub">Campaigns &amp; content systems</span></a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-btn" href="growthoverview.html">Growth Labs
          <svg class="nav-chevron" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <ul class="nav-drop" role="menu">
          <li><a class="drop-a" href="paidads.html"><span class="drop-title">Paid Ads</span><span class="drop-sub">Meta, Google &amp; marketplace</span></a></li>
          <li><a class="drop-a" href="seo.html"><span class="drop-title">SEO</span><span class="drop-sub">Organic search &amp; content growth</span></a></li>
          <li><a class="drop-a" href="analytics.html"><span class="drop-title">Analytics &amp; Reporting</span><span class="drop-sub">Data dashboards &amp; insights</span></a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-btn" href="productoverview.html">Product Labs
          <svg class="nav-chevron" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <ul class="nav-drop" role="menu">
          <li><a class="drop-a" href="productdevelopment.html"><span class="drop-title">Product Development</span><span class="drop-sub">Digital products &amp; platforms</span></a></li>
          <li><a class="drop-a" href="website.html"><span class="drop-title">Website</span><span class="drop-sub">Design &amp; web engineering</span></a></li>
          <li><a class="drop-a" href="applications.html"><span class="drop-title">Applications</span><span class="drop-sub">Mobile &amp; web apps</span></a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-btn" href="aienablement.html">AI Enablement
          <svg class="nav-chevron" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <ul class="nav-drop" role="menu">
          <li><a class="drop-a" href="aiagents.html"><span class="drop-title">AI Agents</span><span class="drop-sub">Custom intelligent automation</span></a></li>
          <li><a class="drop-a" href="workflowautomation.html"><span class="drop-title">Workflow Automation</span><span class="drop-sub">Smart process integration</span></a></li>
          <li><a class="drop-a" href="customisedai.html"><span class="drop-title">Customised AI Solutions</span><span class="drop-sub">Bespoke AI for your business</span></a></li>
        </ul>
      </li>
      <li class="nav-item"><a class="nav-btn" href="portfolio.html">Portfolio</a></li>
    </ul>

    <a href="https://cal.com/modo-minds/free-consultation-call" target="_blank" rel="noopener" class="nav-cta">
      Book Free Consultation <i class="fa-solid fa-arrow-right" style="font-size:.8rem"></i>
    </a>

    <button class="nav-hamburger" id="nav-ham" aria-label="Toggle navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <!-- Mobile Menu Overlay -->
  <div id="mm-overlay" aria-hidden="true" role="dialog" aria-label="Navigation menu">
    <div id="mm-panel">
      <ul style="list-style:none;padding:0;margin:0;">

        <li class="mm-item">
          <div class="mm-hdr">
            <a class="mm-hdr-link" href="studio.html">Studio</a>
            <button class="mm-hdr-toggle" data-mm="mm-studio" aria-label="Expand Studio menu">
              <svg class="mm-chevron" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div class="mm-drop" id="mm-studio">
            <a class="mm-drop-a" href="brandidentity.html"><span class="mm-drop-title">Brand Identity</span><span class="mm-drop-sub">Visual language &amp; positioning</span></a>
            <a class="mm-drop-a" href="shoot.html"><span class="mm-drop-title">Shoot &amp; Production</span><span class="mm-drop-sub">Photo, video &amp; creative assets</span></a>
            <a class="mm-drop-a" href="creativestrategy.html"><span class="mm-drop-title">Creative Strategy</span><span class="mm-drop-sub">Campaigns &amp; content systems</span></a>
          </div>
        </li>

        <li class="mm-item">
          <div class="mm-hdr">
            <a class="mm-hdr-link" href="growthoverview.html">Growth Labs</a>
            <button class="mm-hdr-toggle" data-mm="mm-growth" aria-label="Expand Growth Labs menu">
              <svg class="mm-chevron" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div class="mm-drop" id="mm-growth">
            <a class="mm-drop-a" href="paidads.html"><span class="mm-drop-title">Paid Ads</span><span class="mm-drop-sub">Meta, Google &amp; marketplace</span></a>
            <a class="mm-drop-a" href="seo.html"><span class="mm-drop-title">SEO</span><span class="mm-drop-sub">Organic search &amp; content growth</span></a>
            <a class="mm-drop-a" href="analytics.html"><span class="mm-drop-title">Analytics &amp; Reporting</span><span class="mm-drop-sub">Data dashboards &amp; insights</span></a>
          </div>
        </li>

        <li class="mm-item">
          <div class="mm-hdr">
            <a class="mm-hdr-link" href="productoverview.html">Product Labs</a>
            <button class="mm-hdr-toggle" data-mm="mm-product" aria-label="Expand Product Labs menu">
              <svg class="mm-chevron" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div class="mm-drop" id="mm-product">
            <a class="mm-drop-a" href="productdevelopment.html"><span class="mm-drop-title">Product Development</span><span class="mm-drop-sub">Digital products &amp; platforms</span></a>
            <a class="mm-drop-a" href="website.html"><span class="mm-drop-title">Website</span><span class="mm-drop-sub">Design &amp; web engineering</span></a>
            <a class="mm-drop-a" href="applications.html"><span class="mm-drop-title">Applications</span><span class="mm-drop-sub">Mobile &amp; web apps</span></a>
          </div>
        </li>

        <li class="mm-item">
          <div class="mm-hdr">
            <a class="mm-hdr-link" href="aienablement.html">AI Enablement</a>
            <button class="mm-hdr-toggle" data-mm="mm-ai" aria-label="Expand AI Enablement menu">
              <svg class="mm-chevron" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div class="mm-drop" id="mm-ai">
            <a class="mm-drop-a" href="aiagents.html"><span class="mm-drop-title">AI Agents</span><span class="mm-drop-sub">Custom intelligent automation</span></a>
            <a class="mm-drop-a" href="workflowautomation.html"><span class="mm-drop-title">Workflow Automation</span><span class="mm-drop-sub">Smart process integration</span></a>
            <a class="mm-drop-a" href="customisedai.html"><span class="mm-drop-title">Customised AI Solutions</span><span class="mm-drop-sub">Bespoke AI for your business</span></a>
          </div>
        </li>

        <li class="mm-item">
          <a class="mm-hdr" href="portfolio.html" style="padding:14px 20px;">Portfolio</a>
        </li>
      </ul>

      <div class="mm-cta-wrap">
        <a href="https://cal.com/modo-minds/free-consultation-call" target="_blank" rel="noopener" class="mm-cta">
          <i class="fa-solid fa-calendar-check"></i> Book Free Consultation
        </a>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  /* ─── BEHAVIOUR ──────────────────────────────────────────────────── */
  var nav     = document.getElementById('nav');
  var ham     = document.getElementById('nav-ham');
  var overlay = document.getElementById('mm-overlay');

  /* Scroll sticky */
  window.addEventListener('scroll', function () {
    nav.classList.toggle('stuck', window.scrollY > 20);
  }, { passive: true });

  /* ── Hamburger open/close ── */
  function openMenu() {
    ham.classList.add('open');
    ham.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  ham.addEventListener('click', function () {
    if (overlay.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close when clicking the dark backdrop (not the panel) */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeMenu();
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Mobile accordion sub-menus ── */
  document.querySelectorAll('[data-mm]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var targetId = btn.getAttribute('data-mm');
      /* parent is either .mm-item or .mm-hdr div inside .mm-item */
      var item = btn.closest('.mm-item');
      var wasOpen  = item.classList.contains('open');

      /* Close all open items */
      document.querySelectorAll('.mm-item.open').forEach(function (el) {
        el.classList.remove('open');
      });

      /* If it wasn't open, open it */
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });

  /* Close mobile menu when a link inside is clicked */
  overlay.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  /* ── Active page highlight ── */
  var path = window.location.pathname;
  document.querySelectorAll('.nav-btn[href], .mm-hdr-link[href], .drop-a[href], .mm-drop-a[href]').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (href && href !== '#' && path.indexOf(href.replace(/^\//, '')) !== -1) {
      a.style.color = '#B4474D';
    }
  });

  /* ── Resize: close mobile menu on desktop ── */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1100 && overlay.classList.contains('open')) {
      closeMenu();
    }
  });

})();
