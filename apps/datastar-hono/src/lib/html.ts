export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function renderLayout({ title, body }: { title: string; body: string }) {
  const clientScriptPath = import.meta.env.PROD ? '/assets/main.js' : '/src/client/main.ts'

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daisyui@5/dist/full.css" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-base-100 min-h-screen">
    <div class="mx-auto max-w-7xl p-4 md:p-8">
      <header class="navbar bg-base-200 rounded-box mb-6">
        <nav class="flex-1">
          <ul class="menu menu-horizontal gap-1 px-2">
            <li><a href="/stationCountries">Railway Station Countries</a></li>
            <li><a href="/openLibrary">Open Library</a></li>
            <li><a href="/energyCharts">Energy Charts</a></li>
          </ul>
        </nav>
      </header>
      ${body}
    </div>
    <script type="module" src="${clientScriptPath}"></script>
  </body>
</html>`
}
