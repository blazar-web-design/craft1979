import { describe, expect, it, vi } from 'vitest'
import { absoluteUrl, buildSocialDescription, seo } from './config'

describe('seo config', () => {
  it('uses a local open graph image', () => {
    expect(seo.ogImage).toBe('/images/og.webp')
  })

  it('builds absolute urls from VITE_SITE_URL', () => {
    vi.stubEnv('VITE_SITE_URL', 'https://craft1979.test/')

    expect(absoluteUrl('/images/og.webp')).toBe(
      'https://craft1979.test/images/og.webp'
    )

    vi.unstubAllEnvs()
  })

  it('builds social copy from the latest episode', () => {
    expect(buildSocialDescription()).toContain('Episode II is out now.')
  })
})
