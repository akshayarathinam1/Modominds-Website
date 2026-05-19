import os
import re

css_to_append = """
/* ── Global Site CTA Banner ── */
.site-cta-container { width:100%; max-width:1180px; margin:0 auto; padding: 0 48px; }
@media (max-width: 1100px) { .site-cta-container { padding: 0 24px; } }
@media (max-width: 768px) { .site-cta-container { padding: 0 16px; } }

.site-cta {
  background: linear-gradient(135deg, #2D141A 0%, #712A2E 100%);
  padding: 96px 48px;
  border-radius: 32px;
  margin-bottom: 96px;
  box-shadow: 0 20px 50px rgba(113,42,46,0.22);
  position: relative; overflow: hidden;
}
.site-cta-flask {
  position: absolute;
  right: 5%; bottom: -10%;
  font-size: 16rem;
  color: rgba(255, 255, 255, 0.03);
  transform: rotate(15deg);
  pointer-events: none;
}
.site-cta-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.site-cta-orb-1 {
  width: 300px; height: 300px;
  background: rgba(242, 72, 85, 0.15);
  top: -80px; left: -60px;
}
.site-cta-orb-2 {
  width: 250px; height: 250px;
  background: rgba(180, 71, 77, 0.12);
  bottom: -60px; right: -50px;
}
.site-cta h2 {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.04em;
  margin-bottom: 14px;
}
.site-cta p {
  font-size: 0.98rem;
  color: rgba(255,255,255,0.75);
  line-height: 1.7;
  max-width: 520px;
  margin: 0 auto 36px;
}
.site-cta-actions {
  display: flex;
  justify-content: center;
}
.site-cta-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 32px;
  background: #fff;
  color: #712A2E;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  transition: transform 0.22s, box-shadow 0.22s;
}
.site-cta-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(0,0,0,0.22);
}
.site-cta-trust {
  display: flex;
  justify-content: center;
  gap: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: 36px;
  padding-top: 24px;
  flex-wrap: wrap;
}
.site-cta-trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 600;
  letter-spacing: 0.02em;
}
.site-cta-trust-item i {
  color: #F24855;
}
@media (max-width: 768px) {
  .site-cta { padding: 64px 24px; border-radius: 20px; }
  .site-cta-flask { display: none; }
}
"""

with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    if '.site-cta-container' not in f.read():
        with open('assets/css/style.css', 'a', encoding='utf-8') as fa:
            fa.write(css_to_append)

# Now let's update HTML files
files = [
    'seo.html', 'paidads.html', 'analytics.html', 
    'productdevelopment.html', 'applications.html', 'website.html',
    'brandidentity.html', 'creativestrategy.html', 'shoot.html'
]

for file in files:
    if not os.path.exists(file):
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the CTA block
    cta_block_pattern = re.compile(r'(<!-- CTA.*?-->\s*(?:<div class="[^"]+">\s*)?<section.*?</section>(?:\s*</div>)?|<!-- ═══ CTA SECTION ═══ -->\s*(?:<div class="[^"]+">\s*)?<section.*?</section>(?:\s*</div>)?)', re.DOTALL | re.IGNORECASE)
    
    match = cta_block_pattern.search(content)
        
    if not match:
        print(f"Could not find CTA block in {file}")
        continue
        
    old_cta = match.group(0)
    
    local_h2 = re.search(r'<h2>(.*?)</h2>', old_cta)
    local_p = re.search(r'<p>(.*?)</p>', old_cta)
    local_btn = re.search(r'<a href="https://cal.com[^>]*>(?:<i[^>]*></i>\s*)?(.*?)(?:\s*<i[^>]*></i>)?</a>', old_cta)
    if not local_btn:
        local_btn = re.search(r'<a href=".*?"[^>]*>(?:<i[^>]*></i>\s*)?(.*?)(?:\s*<i[^>]*></i>)?</a>', old_cta)
    
    t = local_h2.group(1) if local_h2 else "Ready to scale your ecosystem?"
    p = local_p.group(1) if local_p else "Schedule a high-level performance audit. We'll analyze your current funnels and identify the highest-leverage growth opportunities."
    
    b_text = local_btn.group(1).strip() if local_btn else "Book Your Audit"
    b_text = re.sub(r'<[^>]+>', '', b_text).strip()
    
    pill_text = "Accelerate Growth"
    icon = "fa-flask"
    if 'product' in file or 'website' in file or 'application' in file:
        pill_text = "Product Launch Ready"
        icon = "fa-code"
    elif 'brand' in file or 'creative' in file or 'shoot' in file:
        pill_text = "Transform Your Brand"
        icon = "fa-pen-nib"
        
    new_cta = f'''<!-- ═══ CTA BANNER ═══ -->
    <div class="site-cta-container">
      <section class="site-cta reveal relative overflow-hidden" aria-label="Call to Action">
        <div class="site-cta-flask" aria-hidden="true">
          <i class="fa-solid {icon}"></i>
        </div>
        <div class="site-cta-orb site-cta-orb-1" aria-hidden="true"></div>
        <div class="site-cta-orb site-cta-orb-2" aria-hidden="true"></div>

        <div class="relative z-10 text-center">
          <div class="flex justify-center mb-6">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold text-white/90 tracking-wide shadow-md">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              {pill_text}
            </span>
          </div>

          <h2>{t}</h2>
          <p>{p}</p>

          <div class="site-cta-actions">
            <a href="https://cal.com/modo-minds/free-consultation-call" target="_blank" rel="noopener" class="site-cta-btn-primary">
              <i class="fa-solid fa-calendar-check"></i> {b_text}
            </a>
          </div>

          <div class="site-cta-trust" aria-label="Trust indicators">
            <div class="site-cta-trust-item">
              <i class="fa-solid fa-shield-halved"></i>
              <span>No Long-Term Contracts</span>
            </div>
            <div class="site-cta-trust-item">
              <i class="fa-solid fa-bolt"></i>
              <span>Fast Turnaround</span>
            </div>
            <div class="site-cta-trust-item">
              <i class="fa-solid fa-star"></i>
              <span>Trusted by 50+ Brands</span>
            </div>
          </div>
        </div>
      </section>
    </div>'''
    
    new_content = content.replace(old_cta, new_cta)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Updated {file}")
