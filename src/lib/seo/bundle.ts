export function buildRobotsTxt(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, '')
  return base
    ? `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
    : `User-agent: *\nAllow: /\n`
}

export function buildSitemapXml(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, '')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
}
