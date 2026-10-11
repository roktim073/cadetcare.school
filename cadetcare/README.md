# Cadet Care School & College — Website

Static, single-page, bilingual (বাংলা / English) site. HTML + CSS + vanilla JS + JSON. No build step.

## Edit content
All text, fees, menu, notices, contacts and gallery live in **`data/site.json`**. Each bilingual field is `{ "bn": "...", "en": "..." }`.

- **Logo:** replace `images/logo.svg` (or point the `<img>` tags in `index.html` to a new file).
- **Gallery:** put photos in `images/` (e.g. `images/gallery-1.jpg`) and set `"src": "images/gallery-1.jpg"` in the `gallery` list. Empty `src` shows a placeholder.
- **Notices:** edit the `notices` list (`d` = date `YYYY-MM-DD`).
- **Menu:** the weekly menu is demo text — replace it under `residential.days`.
- **Facebook / map:** change `school.facebook` and `school.map` (a Google Maps embed URL: Maps → Share → Embed a map).
- **Domain in SEO tags:** update the `<meta>` and JSON-LD in `index.html` if the site gets a custom domain.

## Preview locally
Browsers block `fetch` on `file://`, so use a tiny server:

    python -m http.server 8000     # then open http://localhost:8000

## Deploy on GitHub Pages
1. Create a new GitHub repository and push all files to the `main` branch (`index.html` must be in the repo root).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After a minute the site is live at `https://<username>.github.io/<repo>/`.
5. Custom domain (optional): enter it under **Settings → Pages → Custom domain** and add the DNS records GitHub shows.
