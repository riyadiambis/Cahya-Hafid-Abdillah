#!/usr/bin/env python3
"""
scripts/split_portfolio.py
Splits single-file portfolio into modular static website:
- Extracts <style> -> docs/css/style.css
- Decodes 62 base64 webp images -> docs/assets/img/<name>.webp
- Extracts scripts -> docs/js/main.js
- Produces clean docs/index.html referencing css and js
- Formats files cleanly with normal indentation
"""

import os
import re
import base64
import shutil

DOCS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs"))
CSS_DIR = os.path.join(DOCS_DIR, "css")
JS_DIR = os.path.join(DOCS_DIR, "js")
IMG_DIR = os.path.join(DOCS_DIR, "assets", "img")

CANDIDATES = [
    os.path.join(DOCS_DIR, "Portofolio_Cahya_Hafid_Abdillah.html"),
    os.path.join(DOCS_DIR, "Portofolio Cahya Hafid Abdillah.html"),
    os.path.join(DOCS_DIR, "_original.html"),
]

def find_source_file():
    for c in CANDIDATES:
        if os.path.exists(c):
            return c
    raise FileNotFoundError("Could not find original portfolio HTML file in docs/")

def backup_original(source_path):
    backup_path = os.path.join(DOCS_DIR, "_original.html")
    if not os.path.exists(backup_path):
        print(f"Creating backup: {source_path} -> {backup_path}")
        shutil.copy2(source_path, backup_path)
    else:
        print(f"Backup already exists: {backup_path}")
    return backup_path

def main():
    source_path = find_source_file()
    print(f"Source file: {source_path}")
    orig_size = os.path.getsize(source_path)
    print(f"Original size: {orig_size:,} bytes ({orig_size / (1024*1024):.2f} MB)")

    backup_original(source_path)

    os.makedirs(CSS_DIR, exist_ok=True)
    os.makedirs(JS_DIR, exist_ok=True)
    os.makedirs(IMG_DIR, exist_ok=True)

    with open(source_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # 1. Extract <style>
    style_match = re.search(r'<style\b[^>]*>(.*?)</style>', content, re.DOTALL | re.IGNORECASE)
    if not style_match:
        raise ValueError("No <style> tag found in HTML")
    style_content = style_match.group(1).strip()

    # Write CSS
    css_path = os.path.join(CSS_DIR, "style.css")
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(style_content + "\n")
    print(f"Extracted CSS: {css_path} ({os.path.getsize(css_path):,} bytes)")

    # 2. Extract <script> tags
    script_matches = list(re.finditer(r'<script\b([^>]*)>(.*?)</script>', content, re.DOTALL | re.IGNORECASE))
    print(f"Found {len(script_matches)} <script> tags")
    if len(script_matches) < 2:
        raise ValueError("Expected at least 2 <script> tags")

    script1_content = script_matches[0].group(2)
    script2_content = script_matches[1].group(2)

    # 3. Find all base64 images in Script 1 (window.IMG)
    # The pattern matches "key": "data:image/<mime>;base64,<base64data>"
    img_pattern = re.compile(r'\"([a-zA-Z0-9_\-]+)\"\s*:\s*\"data:image\/([a-zA-Z0-9\+\-\.]+);base64,([A-Za-z0-9+/=]+)\"')
    img_items = img_pattern.findall(script1_content)
    print(f"Extracted {len(img_items)} base64 images from script 1")

    if len(img_items) != 62:
        print(f"WARNING: Expected 62 images, found {len(img_items)}!")

    img_registry = {}
    for key, mime, b64_str in img_items:
        ext = "webp" if "webp" in mime.lower() else mime.split("+")[0].split("-")[0]
        filename = f"{key}.{ext}"
        filepath = os.path.join(IMG_DIR, filename)

        raw_bytes = base64.b64decode(b64_str)
        with open(filepath, "wb") as img_file:
            img_file.write(raw_bytes)

        # Path relative to index.html
        rel_path = f"assets/img/{filename}"
        img_registry[key] = rel_path

    print(f"Saved {len(img_registry)} images to {IMG_DIR}")

    # Check for any other base64 strings in the entire content
    remaining_b64 = re.findall(r'data:image\/[a-zA-Z0-9\+\-\.]+;base64,[A-Za-z0-9+/=]+', script2_content)
    if remaining_b64:
        print(f"WARNING: Found {len(remaining_b64)} additional base64 images in script 2!")

    # 4. Build docs/js/main.js
    # Extract code before window.IMG in script 1 (e.g. skin preference)
    img_idx = script1_content.find("window.IMG")
    pre_img_code = script1_content[:img_idx].strip() if img_idx != -1 else ""

    # Format window.IMG nicely
    formatted_img_entries = []
    for k, v in img_registry.items():
        formatted_img_entries.append(f'  "{k}": "{v}"')
    formatted_img_js = "window.IMG = {\n" + ",\n".join(formatted_img_entries) + "\n};\n"

    main_js_parts = []
    if pre_img_code:
        main_js_parts.append("// --- Skin / Theme Preference Initialization ---")
        main_js_parts.append(pre_img_code)
        main_js_parts.append("")

    main_js_parts.append("// --- Image Registry (Decoded Assets) ---")
    main_js_parts.append(formatted_img_js)
    main_js_parts.append("// --- Main Portfolio Logic & Interactions ---")
    main_js_parts.append(script2_content.strip())
    main_js_parts.append("")

    js_path = os.path.join(JS_DIR, "main.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("\n".join(main_js_parts))
    print(f"Extracted JS: {js_path} ({os.path.getsize(js_path):,} bytes)")

    # 5. Build docs/index.html
    # Replace <style>...</style> with <link rel="stylesheet" href="css/style.css">
    new_html = content[:style_match.start()] + '<link rel="stylesheet" href="css/style.css">' + content[style_match.end():]

    # Re-find script tags in the modified new_html
    script_matches_new = list(re.finditer(r'<script\b[^>]*(?:>(.*?)</script>|/>)', new_html, re.DOTALL | re.IGNORECASE))

    # Remove script 1 (in <head>) and replace script 2 (before </body>) with <script src="js/main.js"></script>
    # To maintain index accuracy, replace from back to front
    s2 = script_matches_new[1]
    s1 = script_matches_new[0]

    # Replace script 2 with <script src="js/main.js"></script>
    new_html = new_html[:s2.start()] + '<script src="js/main.js"></script>' + new_html[s2.end():]

    # Script 1 in <head>: we can either remove it or keep the skin script inline in <head> for zero-FOUC
    # Let's keep the lightweight skin script in <head> to avoid FOUC, or remove it since main.js also has it.
    # To be fully modular and prevent flash of unstyled skin before DOM load:
    head_skin_script = "<script>\n" + pre_img_code + "\n</script>" if pre_img_code else ""
    new_html = new_html[:s1.start()] + head_skin_script + new_html[s1.end():]

    # Clean up empty lines / formatting
    new_html = re.sub(r'\n{3,}', '\n\n', new_html)

    index_path = os.path.join(DOCS_DIR, "index.html")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(new_html)
    print(f"Generated HTML: {index_path} ({os.path.getsize(index_path):,} bytes)")

    # 6. Verification checks
    print("\n--- VERIFICATION CHECKS ---")
    with open(index_path, "r", encoding="utf-8") as f:
        index_data = f.read()
    with open(js_path, "r", encoding="utf-8") as f:
        js_data = f.read()
    with open(css_path, "r", encoding="utf-8") as f:
        css_data = f.read()

    b64_in_index = "base64" in index_data
    b64_in_js = "base64" in js_data
    b64_in_css = "base64" in css_data
    print(f"Contains 'base64' in index.html: {b64_in_index}")
    print(f"Contains 'base64' in main.js: {b64_in_js}")
    print(f"Contains 'base64' in style.css: {b64_in_css}")

    saved_images = [f for f in os.listdir(IMG_DIR) if f.endswith(".webp")]
    print(f"Total webp images saved: {len(saved_images)}")

    total_img_size = sum(os.path.getsize(os.path.join(IMG_DIR, f)) for f in saved_images)
    print(f"Total images size: {total_img_size:,} bytes ({total_img_size / (1024*1024):.2f} MB)")
    print(f"HTML size: {len(index_data):,} bytes ({len(index_data)/1024:.1f} KB)")
    print(f"CSS size: {len(css_data):,} bytes ({len(css_data)/1024:.1f} KB)")
    print(f"JS size: {len(js_data):,} bytes ({len(js_data)/1024:.1f} KB)")

    # Check max line lengths
    max_line_html = max(len(l) for l in index_data.splitlines())
    max_line_css = max(len(l) for l in css_data.splitlines())
    max_line_js = max(len(l) for l in js_data.splitlines())
    print(f"Max line length in index.html: {max_line_html}")
    print(f"Max line length in style.css: {max_line_css}")
    print(f"Max line length in main.js: {max_line_js}")

if __name__ == "__main__":
    main()
