// Self-host the Tailwind browser build (prototyping only) so the course works behind a CDN block.
import { mkdirSync, copyFileSync } from "node:fs";

mkdirSync("public/vendor", { recursive: true });
copyFileSync("node_modules/@tailwindcss/browser/dist/index.global.js", "public/vendor/tailwindcss-browser.js");
copyFileSync("node_modules/daisyui/daisyui.css", "public/vendor/daisyui.css");
copyFileSync("node_modules/daisyui/themes.css", "public/vendor/daisyui-themes.css");
