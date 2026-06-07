import { describe, expect, it } from 'vitest'
import { navLinks, site, socialLinks } from './site'

describe('site', () => {
  it('defines core metadata', () => {
    expect(site.name).toBe('Craft 1979')
    expect(site.tagline).toContain('1979')
  })

  it('links to latent diffusion channels', () => {
    expect(site.channelUrl).toBe('https://www.youtube.com/@LatentDiffusion')
    expect(site.patreonUrl).toBe('https://www.patreon.com/cw/LatentDiffusion')
  })

  it('exposes navigation anchors', () => {
    expect(navLinks.map((link) => link.href)).toEqual([
      '#episodes',
      '#about',
      '#support',
    ])
  })

  it('mirrors social links to site urls', () => {
    const youtube = socialLinks.find((link) => link.id === 'youtube')
    const patreon = socialLinks.find((link) => link.id === 'patreon')
    expect(youtube?.href).toBe(site.channelUrl)
    expect(patreon?.href).toBe(site.patreonUrl)
  })
})
