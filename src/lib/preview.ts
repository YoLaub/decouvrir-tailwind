export const DEFAULT_CSS = '@import "tailwindcss";';

export interface PreviewOptions {
  /** Absolute URL prefix where tailwindcss-browser.js is served. */
  assetBase: string;
  /** Learner stylesheet (processed by Tailwind in the browser). Defaults to the bare import. */
  css?: string;
}

export function buildPreviewDoc(html: string, { assetBase, css = DEFAULT_CSS }: PreviewOptions): string {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="${assetBase}tailwindcss-browser.js"></script>
<style type="text/tailwindcss">${css}</style>
</head>
<body>
${html}
</body>
</html>`;
}
