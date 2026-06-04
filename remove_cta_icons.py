import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# Pattern to find <div class="site-cta-flask" aria-hidden="true">
# followed by an <i> tag and remove the <i> tag.
# We can just look for `<div class="site-cta-flask"[^>]*>\s*<i[^>]*></i>\s*</div>`
# and replace with `<div class="site-cta-flask" aria-hidden="true"></div>`

for filename in html_files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The user might have `site-cta-flask` or `gl-cta-flask` etc. Let's just remove the inner <i> for anything ending with -flask or similar
    # In earlier search: `site-cta-flask` was the main one. Let's do a broad replace.
    new_content = re.sub(
        r'(<div class="site-cta-flask"[^>]*>)\s*<i[^>]*></i>\s*(</div>)',
        r'\1\2',
        content
    )
    
    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
