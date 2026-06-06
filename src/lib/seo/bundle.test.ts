import { describe, expect, it } from 'vitest'
import { buildRobotsTxt, buildSitemapXml } from './bundle'

describe('buildRobotsTxt', () => {
  it('allows all crawlers without a site url', () => {
    expect(buildRobotsTxt('')).toBe('User-agent: *\nAllow: /\n')
  })

  it('includes a sitemap when a site url is configured', () => {
    expect(buildRobotsTxt('https://craft1979.example')).toBe(
      'User-agent: *\nAllow: /\n\nSitemap: https://craft1979.example/sitemap.xml\n'
    )
  })

  it('strips trailing slashes from the site url', () => {
    expect(buildRobotsTxt('https://craft1979.example/')).toContain(
      'Sitemap: https://craft1979.example/sitemap.xml'
    )
  })
})

describe('buildSitemapXml', () => {
  it('writes the homepage entry', () => {
    const xml = buildSitemapXml('https://craft1979.example')

    expect(xml).toContain('<loc>https://craft1979.example/</loc>')
    expect(xml).toContain('<changefreq>weekly</changefreq>')
    expect(xml).toContain('<priority>1.0</priority>')
  })

  it('strips trailing slashes from the site url', () => {
    const xml = buildSitemapXml('https://craft1979.example/')

    expect(xml).toContain('<loc>https://craft1979.example/</loc>')
  })
})
