# Découvrir Tailwind

Course companion site for a one-day Tailwind CSS v4 introduction (CDA training): one page
per topic, with live HTML/CSS editors whose preview runs Tailwind, plus a self-check.

Live site (once published): https://yolaub.github.io/decouvrir-tailwind/

## Develop

```bash
npm install
npm run dev     # copies the Tailwind browser build into public/vendor, then starts the dev server
npm test        # unit tests (preview document builder, page navigation)
npm run build   # static site in dist/
```

Previews use the self-hosted `@tailwindcss/browser` build (`scripts/copy-vendor.mjs` copies it
from `node_modules` at build time), so the course works on a network that blocks CDNs. That
build is for prototyping only: unlike a real project's build step, it also picks up class
names assembled at runtime. Each preview is a sandboxed `iframe`.
Pushing to `main` deploys through GitHub Actions.

## Adding a page

Create `src/pages/<slug>.astro` and add the slug to `src/lib/pages.ts`, which drives the
index and the previous/next navigation.

## Le Portage (hands-on activity)

The activity lives under `/tp/`: a hub, rounds 0 to 2 chained with previous/next buttons,
and two pages released on demand (`manche-3`, `jeu-des-erreurs`) that are linked from
nowhere, so the trainer shares the URL when the round starts (see `src/lib/tp.ts`).
Answer keys, scoring and observation grid are trainer-only and never committed here;
a test guards the pages against those words. Pages carry `noindex`.
