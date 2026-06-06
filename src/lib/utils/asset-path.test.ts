import { describe, expect, it } from 'vitest'
import { assetPath, siteRoot } from './asset-path'

describe('assetPath', () => {
  it('returns root-relative paths unchanged at the default base', () => {
    expect(assetPath('/images/hero-portrait.jpg')).toBe(
      '/images/hero-portrait.jpg'
    )
  })

  it('preserves absolute urls', () => {
    expect(assetPath('https://example.com/image.jpg')).toBe(
      'https://example.com/image.jpg'
    )
  })

  it('exposes the site root from the vite base url', () => {
    expect(siteRoot()).toBe('/')
  })
})
