# Desktag Website (GitHub Pages)

Static marketing website, Support FAQ, and Privacy Policy for **Desktag** (Mac App Store edition).

- **Zero external dependencies:** no external font CDNs, no analytics, no cookies, no build toolchain required.
- **Relative asset paths:** works at a GitHub Pages project subpath (`https://<user>.github.io/<repo>/`), user root (`https://<user>.github.io/`), or custom domain.
- **Included pages:**
  - `index.html` — Marketing landing page with interactive sticker/switcher playground, all 10 Mac App Store screenshots, interactive 8-transition preview, honest public-API engineering overview, Free vs. Pro pricing, and privacy guarantees.
  - `support.html` — Searchable 26-topic troubleshooting & feature reference.
  - `privacy.html` — Privacy policy matching the in-app `PrivacyView` and App Store "Data Not Collected" disclosure.
  - `404.html` — Standalone GitHub Pages 404 page.

## 1. Fill in your live links before publishing

Replace `SITE_URL`, `APP_STORE_URL`, and `SUPPORT_EMAIL` in one step:

```sh
./scripts/configure.sh \
  --site-url "https://<your-github-username>.github.io/<repo-name>" \
  --app-store-url "https://apps.apple.com/app/id<your-apple-id>" \
  --support-email "support@yourdomain.com"
```

Pass `--cname "desktag.yourdomain.com"` as well if using a custom domain.

## 2. Preview locally

```sh
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## 3. Deploy to GitHub Pages

1. Create a **public** GitHub repository (your app source code can remain private).
2. Push this folder to the `main` branch:
   ```sh
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In GitHub: **Settings › Pages › Build and deployment › Source**, choose **GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) automatically stages and deploys only the public site files whenever you push to `main`.

## 4. Connect the live URLs back to Desktag

Once published:
- Enter the Marketing URL (`SITE_URL/`), Support URL (`SITE_URL/support.html`), and Privacy Policy URL (`SITE_URL/privacy.html`) in App Store Connect.
- Set `DesktagSiteURL` and `DesktagAppStoreID` in the app's `project.yml`, then run `xcodegen generate`.
