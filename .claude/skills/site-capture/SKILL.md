---
name: site-capture
description: Render web pages in headless Chromium at desktop (1440) and mobile (iPhone 13) sizes, save top and full-page screenshots plus a JSON extract (headings, nav, fonts, text, script/request counts). Use for auditing a live site (e.g. morphparfum.ro, competitors) or visually checking the concept build at the standard breakpoints.
---

# site-capture

Local project skill. It uses the globally installed Node Playwright and the preinstalled Chromium; nothing gets installed.

```bash
NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt NODE_NO_WARNINGS=1 \
  node .claude/skills/site-capture/capture.mjs https://morphparfum.ro <scratchpad>/capture "" parfumuri morph-zeta-parfum-100ml
```

- `""` is the homepage. The output goes to `<outDir>/shots` and `<outDir>/data`. Write it to the scratchpad, never to the repo, because the screenshots of third-party sites are not committed.
- In the cloud sandbox Chromium does not trust the proxy CA. With `NODE_EXTRA_CA_CERTS` set, the script routes browser requests through Node's `fetch`, which verifies TLS against that bundle. TLS verification is never disabled. Locally (no env var) Chromium fetches directly.
- Load times under interception are not meaningful. Use request and script counts, and Lighthouse for real performance numbers.
- Cookie banners are not dismissed automatically. Click them in a custom step if they block the first screenshot.
- For the concept app, run it against the local dev server URL (`http://localhost:3000`) without the env vars.
