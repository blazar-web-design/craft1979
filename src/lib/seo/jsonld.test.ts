import { describe, expect, it, vi } from 'vitest'
import { episodes } from '../data/episodes'
import { site } from '../data/site'
import { absoluteUrl } from './config'
import { buildJsonLd } from './jsonld'

describe('buildJsonLd', () => {
  it('includes website, organization, series, and episode schemas', () => {
    const graph = buildJsonLd()
    const types = graph.map((item) => item['@type'])

    expect(types).toContain('WebSite')
    expect(types).toContain('Organization')
    expect(types).toContain('CreativeWorkSeries')
    expect(types).toContain('ItemList')
    expect(types.filter((type) => type === 'VideoObject').length).toBe(
      episodes.length
    )
  })

  it('uses episode thumbnails for video objects', () => {
    vi.stubEnv('VITE_SITE_URL', 'https://craft1979.test')

    const graph = buildJsonLd()
    const videos = graph.filter((item) => item['@type'] === 'VideoObject')

    for (const episode of episodes) {
      const video = videos.find(
        (item) => item.name === `${site.name} ${episode.title}`
      )
      expect(video?.thumbnailUrl).toBe(absoluteUrl(episode.thumbnail))
      expect(video?.embedUrl).toBe(
        `https://www.youtube.com/embed/${episode.youtubeId}`
      )
    }

    vi.unstubAllEnvs()
  })
})
