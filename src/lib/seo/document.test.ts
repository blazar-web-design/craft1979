// @vitest-environment happy-dom

import { beforeEach, describe, expect, it } from 'vitest'
import { applyJsonLd, applyPageMeta } from './document'

describe('applyPageMeta', () => {
  beforeEach(() => {
    document.head.innerHTML = `
      <meta name="description" content="static fallback" />
      <meta property="og:description" content="static fallback" />
      <meta name="twitter:description" content="static fallback" />
    `
    document.title = 'static title'
  })

  it('updates the document title and social descriptions', () => {
    applyPageMeta()

    expect(document.title).toBe('Craft 1979')
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content')
    ).toContain('Episode II is out now.')
    expect(
      document
        .querySelector('meta[property="og:description"]')
        ?.getAttribute('content')
    ).toContain('Episode II is out now.')
    expect(
      document
        .querySelector('meta[name="twitter:description"]')
        ?.getAttribute('content')
    ).toContain('Episode II is out now.')
  })
})

describe('applyJsonLd', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
  })

  it('injects json-ld scripts into the document head', () => {
    applyJsonLd()

    const scripts = document.querySelectorAll(
      'script[data-craft1979-jsonld="true"]'
    )

    expect(scripts.length).toBeGreaterThan(0)
    for (const script of scripts) {
      expect(script.getAttribute('type')).toBe('application/ld+json')
      expect(script.textContent).toMatch(/"@type"/)
    }
  })

  it('replaces existing json-ld scripts on re-apply', () => {
    applyJsonLd()
    const firstCount = document.querySelectorAll(
      'script[data-craft1979-jsonld="true"]'
    ).length

    applyJsonLd()

    const secondCount = document.querySelectorAll(
      'script[data-craft1979-jsonld="true"]'
    ).length
    expect(secondCount).toBe(firstCount)
    expect(
      document.querySelectorAll('script[data-craft1979-jsonld="true"]').length
    ).toBe(firstCount)
  })
})
