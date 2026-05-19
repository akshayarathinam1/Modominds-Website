/**
 * head.js — Modo Minds Shared Head Injector
 *
 * Injects all common <head> resources into every page:
 *   - Google Analytics (gtag.js)
 *   - Meta Pixel
 *   - charset + viewport meta tags
 *   - Favicon
 *   - Google Fonts (Poppins)
 *   - Font Awesome 6.5
 *   - style.css
 *
 * Usage: Add <script src="head.js"></script> inside each page's <head>,
 *        AFTER the page-specific <title> and <meta name="description">.
 */
(function () {
  var head = document.head;

  /* ── Helpers ── */
  function injectMeta(name, content, attrName) {
    attrName = attrName || 'name';
    var el = document.createElement('meta');
    el.setAttribute(attrName, name);
    el.content = content;
    head.insertBefore(el, head.firstChild);
  }

  function injectLink(attrs) {
    var el = document.createElement('link');
    for (var k in attrs) if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
    head.appendChild(el);
  }

  function injectScript(src, isAsync) {
    var el = document.createElement('script');
    el.src = src;
    if (isAsync) el.async = true;
    head.appendChild(el);
  }

  function injectScriptInline(code) {
    var el = document.createElement('script');
    el.textContent = code;
    head.appendChild(el);
  }

  /* ── 1. charset & viewport (prepend so they appear first) ── */
  var viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, initial-scale=1.0';
  head.insertBefore(viewport, head.firstChild);

  var charset = document.createElement('meta');
  charset.setAttribute('charset', 'UTF-8');
  head.insertBefore(charset, head.firstChild);

  /* ── 2. Favicon ── */
  injectLink({
    rel: 'icon',
    type: 'image/x-icon',
    href: 'assets/logo/favicon.ico.png'
  });

  /* ── 3. Google Fonts preconnects ── */
  injectLink({ rel: 'preconnect', href: 'https://fonts.googleapis.com' });
  injectLink({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' });

  /* ── 4. Poppins font ── */
  injectLink({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap'
  });

  /* ── 5. Font Awesome ── */
  injectLink({
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
  });

  /* ── 5b. Tailwind CSS CDN ── */
  injectScript('https://cdn.tailwindcss.com');
  injectScriptInline(
    'tailwind.config = {' +
    '  theme: {' +
    '    extend: {' +
    '      colors: {' +
    "        brand: { dark: '#712A2E', mid: '#B4474D', bright: '#F24855', pale: '#FDECEA' }" +
    '      }' +
    '    }' +
    '  }' +
    '};'
  );

  /* ── 6. Global stylesheet ── */
  injectLink({ rel: 'stylesheet', href: 'assets/css/style.css' });

  /* ── 7. Google Analytics ── */
  injectScript('https://www.googletagmanager.com/gtag/js?id=G-KL76ZNJHLY', true);
  injectScriptInline(
    'window.dataLayer = window.dataLayer || [];' +
    'function gtag(){dataLayer.push(arguments);}' +
    "gtag('js', new Date());" +
    "gtag('config', 'G-KL76ZNJHLY');"
  );

  /* ── 8. Meta Pixel ── */
  injectScriptInline(
    '!function(f,b,e,v,n,t,s)' +
    '{if(f.fbq)return;n=f.fbq=function(){n.callMethod?' +
    'n.callMethod.apply(n,arguments):n.queue.push(arguments)};' +
    "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';" +
    "n.queue=[];t=b.createElement(e);t.async=!0;" +
    "t.src=v;s=b.getElementsByTagName(e)[0];" +
    "s.parentNode.insertBefore(t,s)}(window, document,'script'," +
    "'https://connect.facebook.net/en_US/fbevents.js');" +
    "fbq('init', '1710826316957448');" +
    "fbq('track', 'PageView');"
  );

  /* Meta Pixel noscript fallback — appended to body on DOMContentLoaded */
  document.addEventListener('DOMContentLoaded', function () {
    var ns = document.createElement('noscript');
    var img = document.createElement('img');
    img.height = '1';
    img.width  = '1';
    img.style.display = 'none';
    img.src = 'https://www.facebook.com/tr?id=1710826316957448&ev=PageView&noscript=1';
    ns.appendChild(img);
    document.body.insertBefore(ns, document.body.firstChild);
  });

})();
