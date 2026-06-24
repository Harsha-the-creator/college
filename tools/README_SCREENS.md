Headless screenshot utility (Puppeteer)

What this does
- Launches headless Chromium and captures full-page screenshots of these pages:
  - index.html, apply.html, status.html, admin.html, dashboard.html
- Captures each page at widths: 1366, 1024, 768, 420, 360
- Saves images into the `screenshots/` folder at workspace root

Quick start
1. Install dependencies (from the repo root):

```bash
npm install
```

2. Run the screenshot script:

```bash
npm run screenshot
```

Notes
- The script opens local files via `file://` URLs. If your pages rely on remote services or authenticated APIs, run a local static server and pass the workspace root to the script:

```bash
# example: serve using Python and then run script pointing at served files
python -m http.server 8000
# then in another terminal (or adapt script to accept http base url)
npm run screenshot
```

- To change pages or breakpoints, edit `tools/screenshot.js`.
- Output folder: `screenshots/` in repository root.
