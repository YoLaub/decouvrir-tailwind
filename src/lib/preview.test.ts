import { describe, it, expect } from "vitest";
import { buildPreviewDoc, DEFAULT_CSS } from "./preview";

const opts = { assetBase: "/decouvrir-tailwind/vendor/" };

describe("buildPreviewDoc", () => {
  it("embeds the learner HTML in the body", () => {
    expect(buildPreviewDoc('<p class="p-4">x</p>', opts)).toContain('<p class="p-4">x</p>');
  });

  it("loads the self-hosted Tailwind browser build", () => {
    expect(buildPreviewDoc("", opts)).toContain('src="/decouvrir-tailwind/vendor/tailwindcss-browser.js"');
  });

  it("defaults to a stylesheet that imports Tailwind", () => {
    const doc = buildPreviewDoc("", opts);
    expect(DEFAULT_CSS).toBe('@import "tailwindcss";');
    expect(doc).toContain(`<style type="text/tailwindcss">${DEFAULT_CSS}</style>`);
  });

  it("uses the learner CSS, e.g. an @theme block, instead of the default", () => {
    const css = '@import "tailwindcss";\n@theme { --color-brand-500: #c00; }';
    const doc = buildPreviewDoc("", { ...opts, css });
    expect(doc).toContain(`<style type="text/tailwindcss">${css}</style>`);
  });

  it("adds a viewport meta so breakpoints follow the frame width", () => {
    expect(buildPreviewDoc("", opts)).toContain('name="viewport"');
  });

  it("does not load daisyUI unless asked", () => {
    expect(buildPreviewDoc("", opts)).not.toContain("daisyui");
  });

  it("loads the self-hosted daisyUI stylesheet when asked", () => {
    const doc = buildPreviewDoc("", { ...opts, daisyui: true });
    expect(doc).toContain('<link rel="stylesheet" href="/decouvrir-tailwind/vendor/daisyui.css">');
    expect(doc).toContain('<link rel="stylesheet" href="/decouvrir-tailwind/vendor/daisyui-themes.css">');
  });
});
