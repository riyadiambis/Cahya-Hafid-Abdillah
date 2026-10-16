#!/usr/bin/env python3
"""
scripts/check_images.py
Checks all image references across docs/index.html, docs/css/style.css, and docs/js/main.js:
- Resolves paths according to browser standards
- Verifies exact CASE-SENSITIVE existence on disk
- Verifies tracking in git (git ls-files)
- Reports OK, wrong paths, case mismatches, missing files, and untracked files
"""

import os
import re
import sys
import subprocess

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOCS_DIR = os.path.join(REPO_ROOT, "docs")
CSS_DIR = os.path.join(DOCS_DIR, "css")
JS_DIR = os.path.join(DOCS_DIR, "js")
IMG_DIR = os.path.join(DOCS_DIR, "assets", "img")

INDEX_PATH = os.path.join(DOCS_DIR, "index.html")
STYLE_PATH = os.path.join(CSS_DIR, "style.css")
MAIN_JS_PATH = os.path.join(JS_DIR, "main.js")

def get_git_tracked_files():
    try:
        output = subprocess.check_output(
            ["git", "ls-files"],
            cwd=REPO_ROOT,
            text=True,
            encoding="utf-8"
        )
        return set(output.splitlines())
    except Exception as e:
        print(f"Warning: Failed to execute git ls-files: {e}")
        return set()

def get_actual_disk_files():
    """Returns actual files in docs/assets/img with exact case."""
    if not os.path.exists(IMG_DIR):
        return []
    return os.listdir(IMG_DIR)

def extract_references():
    references = []  # list of dicts: {source_file, ref_type, raw_ref, resolved_rel_docs}

    # 1. References in HTML
    if os.path.exists(INDEX_PATH):
        with open(INDEX_PATH, "r", encoding="utf-8", errors="ignore") as f:
            html = f.read()

        # src="..."
        for m in re.finditer(r'<[^>]+\bsrc=["\']([^"\']+)["\']', html, re.I):
            raw = m.group(1)
            if not raw.startswith("data:") and not raw.startswith("http:") and not raw.startswith("https:"):
                references.append({
                    "source_file": "docs/index.html",
                    "ref_type": "html_src",
                    "raw_ref": raw,
                    "base_dir": DOCS_DIR
                })

        # srcset="..."
        for m in re.finditer(r'<[^>]+\bsrcset=["\']([^"\']+)["\']', html, re.I):
            for part in m.group(1).split(","):
                part = part.strip().split()[0]
                if part and not part.startswith("data:") and not part.startswith("http"):
                    references.append({
                        "source_file": "docs/index.html",
                        "ref_type": "html_srcset",
                        "raw_ref": part,
                        "base_dir": DOCS_DIR
                    })

        # inline style="...url(...)..."
        for m in re.finditer(r'url\([\'"]?([^\'")]+)[\'"]?\)', html, re.I):
            raw = m.group(1)
            if not raw.startswith("data:") and not raw.startswith("http"):
                references.append({
                    "source_file": "docs/index.html",
                    "ref_type": "html_inline_url",
                    "raw_ref": raw,
                    "base_dir": DOCS_DIR
                })

    # 2. References in CSS
    if os.path.exists(STYLE_PATH):
        with open(STYLE_PATH, "r", encoding="utf-8", errors="ignore") as f:
            css = f.read()

        for m in re.finditer(r'url\([\'"]?([^\'")]+)[\'"]?\)', css, re.I):
            raw = m.group(1)
            if not raw.startswith("data:") and not raw.startswith("http"):
                references.append({
                    "source_file": "docs/css/style.css",
                    "ref_type": "css_url",
                    "raw_ref": raw,
                    "base_dir": CSS_DIR
                })

    # 3. References in JS
    if os.path.exists(MAIN_JS_PATH):
        with open(MAIN_JS_PATH, "r", encoding="utf-8", errors="ignore") as f:
            js = f.read()

        # window.IMG entries
        for m in re.finditer(r'\"([a-zA-Z0-9_\-]+)\"\s*:\s*\"([^\"]+)\"', js):
            val = m.group(2)
            if "assets/" in val or val.endswith((".webp", ".png", ".jpg", ".jpeg", ".svg")):
                references.append({
                    "source_file": "docs/js/main.js",
                    "ref_type": f"js_window_IMG[{m.group(1)}]",
                    "raw_ref": val,
                    "base_dir": DOCS_DIR
                })

        # string literals in JS pointing to assets/img
        for m in re.finditer(r'["\']((?:\.?\/?|\.\.\/)?assets\/img\/[^"\']+)["\']', js):
            val = m.group(1)
            # Avoid duplicate if already in window.IMG
            if not any(r["raw_ref"] == val and r["source_file"] == "docs/js/main.js" for r in references):
                references.append({
                    "source_file": "docs/js/main.js",
                    "ref_type": "js_string_literal",
                    "raw_ref": val,
                    "base_dir": DOCS_DIR
                })

        # dynamic concatenations like 'assets/img/' + x + '.webp'
        dyn_matches = re.finditer(r'[\'"]assets\/img\/[\'"]\s*\+\s*([a-zA-Z0-9_\.\(\)]+)\s*\+\s*[\'"]\.webp[\'"]', js)
        for m in dyn_matches:
            references.append({
                "source_file": "docs/js/main.js",
                "ref_type": f"js_dynamic({m.group(1)})",
                "raw_ref": f"assets/img/*{m.group(1)}*.webp",
                "base_dir": DOCS_DIR
            })

    return references

def check_all():
    git_files = get_git_tracked_files()
    disk_files = get_actual_disk_files()
    disk_files_lower_map = {f.lower(): f for f in disk_files}

    references = extract_references()

    print(f"==================================================")
    print(f" CHECK IMAGES REPORT")
    print(f"==================================================")
    print(f"Total references found in code: {len(references)}")
    print(f"Total WebP files on disk in docs/assets/img/: {len(disk_files)}")
    print(f"Total files tracked by git in repo: {len(git_files)}")
    print(f"--------------------------------------------------\n")

    ok_list = []
    wrong_path_list = []
    case_mismatch_list = []
    missing_file_list = []
    untracked_list = []

    for ref in references:
        raw = ref["raw_ref"]
        base = ref["base_dir"]
        src = ref["source_file"]
        rtype = ref["ref_type"]

        # Check for path starting with "/"
        if raw.startswith("/"):
            wrong_path_list.append({
                "ref": ref,
                "reason": "Path starts with leading '/' (absolute to domain root, breaks GitHub Pages subpaths)"
            })
            continue

        # In CSS, check if path fails to go up a folder
        if src == "docs/css/style.css":
            if not raw.startswith("../"):
                wrong_path_list.append({
                    "ref": ref,
                    "reason": "CSS url() path must start with '../' to navigate out of css/ into assets/"
                })
                continue

        # Compute normalized target path relative to REPO_ROOT
        resolved_abs = os.path.normpath(os.path.join(base, raw))
        resolved_rel_repo = os.path.relpath(resolved_abs, REPO_ROOT).replace("\\", "/")

        # Check if target is inside docs/assets/img/
        target_dir = os.path.dirname(resolved_abs)
        target_filename = os.path.basename(resolved_abs)

        if not os.path.isdir(target_dir):
            missing_file_list.append({
                "ref": ref,
                "reason": f"Target directory does not exist: {target_dir}"
            })
            continue

        actual_files_in_dir = os.listdir(target_dir)

        # Exact case match check
        if target_filename in actual_files_in_dir:
            # File exists with exact case!
            # Now check git tracking
            if resolved_rel_repo in git_files:
                ok_list.append({
                    "ref": ref,
                    "resolved": resolved_rel_repo
                })
            else:
                untracked_list.append({
                    "ref": ref,
                    "resolved": resolved_rel_repo,
                    "reason": "File exists on disk with exact case but is NOT tracked by git (git ls-files)"
                })
        else:
            # Check if case mismatch
            match_lower = None
            for af in actual_files_in_dir:
                if af.lower() == target_filename.lower():
                    match_lower = af
                    break

            if match_lower:
                case_mismatch_list.append({
                    "ref": ref,
                    "expected": target_filename,
                    "actual_on_disk": match_lower,
                    "reason": f"Case mismatch: code references '{target_filename}', disk has '{match_lower}'"
                })
            else:
                missing_file_list.append({
                    "ref": ref,
                    "expected": target_filename,
                    "reason": f"File does not exist on disk in {target_dir}"
                })

    # Summary
    print(f" [OK] Valid References: {len(ok_list)}")
    print(f" [!] Wrong Path Format: {len(wrong_path_list)}")
    print(f" [!] Case Mismatches: {len(case_mismatch_list)}")
    print(f" [!] Missing Files on Disk: {len(missing_file_list)}")
    print(f" [!] Untracked by Git: {len(untracked_list)}")
    print(f"--------------------------------------------------\n")

    if wrong_path_list:
        print("=== WRONG PATHS ===")
        for item in wrong_path_list:
            print(f"  - [{item['ref']['source_file']}] ({item['ref']['ref_type']}): '{item['ref']['raw_ref']}' -> {item['reason']}")
        print()

    if case_mismatch_list:
        print("=== CASE MISMATCHES ===")
        for item in case_mismatch_list:
            print(f"  - [{item['ref']['source_file']}] Expected '{item['expected']}' but found '{item['actual_on_disk']}'")
        print()

    if missing_file_list:
        print("=== MISSING FILES ===")
        for item in missing_file_list:
            print(f"  - [{item['ref']['source_file']}] ({item['ref']['ref_type']}): '{item['ref']['raw_ref']}' -> {item['reason']}")
        print()

    if untracked_list:
        print("=== UNTRACKED FILES ===")
        for item in untracked_list:
            print(f"  - '{item['resolved']}' is not tracked in git")
        print()

    # Also check if any disk files in docs/assets/img/ are untracked by git
    untracked_disk_images = []
    for df in disk_files:
        rel = f"docs/assets/img/{df}"
        if rel not in git_files:
            untracked_disk_images.append(rel)

    if untracked_disk_images:
        print(f"=== DISK IMAGES NOT TRACKED BY GIT ({len(untracked_disk_images)}) ===")
        for f in untracked_disk_images:
            print(f"  - {f}")
        print()

    # Return exit code
    has_errors = bool(wrong_path_list or case_mismatch_list or missing_file_list or untracked_list or untracked_disk_images)
    if not has_errors:
        print(">>> ALL IMAGE REFERENCES AND ASSETS ARE 100% OK! <<<")
        return 0
    else:
        print(">>> ISSUES DETECTED. PLEASE REVIEW AND FIX. <<<")
        return 1

if __name__ == "__main__":
    sys.exit(check_all())
