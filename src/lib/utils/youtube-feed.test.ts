import { describe, expect, it } from 'vitest'
import {
  filterCraftEpisodes,
  parseYoutubeFeed,
  summarizeDescription,
  toEpisodeSources,
} from './youtube-feed'

const sampleFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/" xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <yt:videoId>Ua2D-PM97xc</yt:videoId>
    <title>CRAFT (1979): The Cove | Episode 2</title>
    <published>2026-06-06T16:07:57+00:00</published>
    <media:group>
      <media:description>The forest deepens.

More text here.</media:description>
      <media:thumbnail url="https://i.ytimg.com/vi/Ua2D-PM97xc/hqdefault.jpg" />
    </media:group>
  </entry>
  <entry>
    <yt:videoId>other123</yt:videoId>
    <title>Unrelated video</title>
    <published>2026-05-01T12:00:00+00:00</published>
    <media:group>
      <media:description>Not craft</media:description>
      <media:thumbnail url="https://i.ytimg.com/vi/other123/hqdefault.jpg" />
    </media:group>
  </entry>
</feed>`

describe('youtube-feed', () => {
  it('parses feed entries', () => {
    const entries = parseYoutubeFeed(sampleFeed)
    expect(entries).toHaveLength(2)
    expect(entries[0].youtubeId).toBe('Ua2D-PM97xc')
    expect(entries[0].publishedAt).toBe('2026-06-06')
  })

  it('filters craft 1979 episodes', () => {
    const entries = filterCraftEpisodes(parseYoutubeFeed(sampleFeed))
    expect(entries).toHaveLength(1)
    expect(entries[0].youtubeId).toBe('Ua2D-PM97xc')
  })

  it('summarizes descriptions to the first line', () => {
    expect(summarizeDescription('First line.\n\nSecond line.')).toBe(
      'First line.'
    )
  })

  it('decodes xml entities without double-unescaping', () => {
    expect(summarizeDescription('Tom &amp; Jerry')).toBe('Tom & Jerry')
    expect(summarizeDescription('&quot;Hello&quot;')).toBe('"Hello"')
    expect(summarizeDescription('&amp;quot;')).toBe('&quot;')
  })

  it('maps feed entries to episode sources with overrides', () => {
    const [source] = toEpisodeSources(
      filterCraftEpisodes(parseYoutubeFeed(sampleFeed)),
      {
        'Ua2D-PM97xc': 'Custom copy',
      }
    )

    expect(source.description).toBe('Custom copy')
  })
})
