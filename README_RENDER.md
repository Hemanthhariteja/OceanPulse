Render deployment and free-plan optimization notes

- This project is configured to deploy to Render's static sites using `render.yaml`.
- Build command (in `render.yaml`) uses `npm ci && npm run build` which will run `vite build` and then `postbuild` to copy static assets into `dist`.

Optimizations for Render Free Plan

1) Minimize build size
   - Vite already performs code-splitting and minification in production builds.
   - Remove large unused assets from the repo or move them to an external CDN (recommended for large 3D assets like .glb/.fbx and high-res textures).

2) Reduce cold-start time
   - Keep the static site CI-run fast: avoid heavy postbuild processing. The included `scripts/copy-static.js` is intentionally simple and fast.

3) Use caching and CDN
   - Render serves static sites behind a CDN. Ensure assets have cache-friendly names (Vite outputs hashed filenames).
   - Large media files (audio, 3D models, textures) should be served from external object storage or a dedicated CDN (e.g., GitHub Releases, Cloudflare Pages, S3 + CloudFront) if you hit bandwidth limits on the free plan.

4) Keep builds deterministic
   - Use `npm ci` in build to ensure clean, reproducible installs (this is already in `render.yaml`).

5) Health checks and preview
   - The `preview.allowedHosts` setting in `vite.config.js` permits Render preview hosts.

How to test locally

1. Install deps: `npm ci`
2. Run dev server: `npm run dev`
3. Create production build: `npm run build` (this will also copy static assets into `dist`)
4. Serve `dist` with a static server, e.g. `npx serve dist` or `npx http-server dist` if you want a quick local test.

Notes

- Consider moving heavy assets out of the repo if you plan on frequent deploys on the free tier to avoid hitting bandwidth or build time limits.
- If you want, I can add a small script to optionally fetch large assets from a remote CDN during postbuild instead of bundling them in the repo.
