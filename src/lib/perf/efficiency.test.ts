import { performance } from 'node:perf_hooks'
import { describe, expect, it } from 'vitest'
import { buildJsonLd } from '../seo/jsonld'
import { buildEpisodes } from '../utils/episodes'
import {
  filterCraftEpisodes,
  parseYoutubeFeed,
  toEpisodeSources,
} from '../utils/youtube-feed'

const SAMPLE_FEED = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/">
${Array.from({ length: 120 }, (_, index) => {
  const day = String((index % 28) + 1).padStart(2, '0')
  return `<entry>
    <id>yt:video:video-${index}</id>
    <title>CRAFT (1979) Episode ${index + 1}</title>
    <published>2026-01-${day}T12:00:00+00:00</published>
    <media:group>
      <media:description>Episode description ${index}</media:description>
      <media:thumbnail url="https://i.ytimg.com/vi/video-${index}/hqdefault.jpg" />
    </media:group>
    <yt:videoId>video-${index}</yt:videoId>
  </entry>`
}).join('\n')}
</feed>`

function sampleSources(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    youtubeId: `video-${index}`,
    publishedAt: `2026-01-${String((index % 28) + 1).padStart(2, '0')}`,
    description: `Episode description ${index}`,
  }))
}

function runGarbageCollection() {
  const gc = (globalThis as { gc?: () => void }).gc
  gc?.()
}

function measureHeapDelta(run: () => void) {
  runGarbageCollection()
  const before = process.memoryUsage().heapUsed
  run()
  runGarbageCollection()
  return process.memoryUsage().heapUsed - before
}

describe('efficiency', () => {
  it('parses large youtube feeds quickly', () => {
    const start = performance.now()
    const entries = parseYoutubeFeed(SAMPLE_FEED)
    const duration = performance.now() - start

    expect(entries).toHaveLength(120)
    expect(duration).toBeLessThan(40)
  })

  it('builds episodes quickly for large feeds', () => {
    const sources = sampleSources(200)
    const start = performance.now()
    const episodes = buildEpisodes(sources)
    const duration = performance.now() - start

    expect(episodes).toHaveLength(200)
    expect(duration).toBeLessThan(50)
  })

  it('keeps episode build heap growth bounded', () => {
    const sources = sampleSources(100)
    const heapDelta = measureHeapDelta(() => {
      for (let index = 0; index < 100; index += 1) {
        buildEpisodes(sources)
      }
    })

    expect(heapDelta).toBeLessThan(12 * 1024 * 1024)
  })

  it('keeps feed parsing heap growth bounded', () => {
    const heapDelta = measureHeapDelta(() => {
      for (let index = 0; index < 80; index += 1) {
        toEpisodeSources(filterCraftEpisodes(parseYoutubeFeed(SAMPLE_FEED)))
      }
    })

    expect(heapDelta).toBeLessThan(12 * 1024 * 1024)
  })

  it('builds json-ld quickly', () => {
    const start = performance.now()
    const graph = buildJsonLd()
    const duration = performance.now() - start

    expect(graph.length).toBeGreaterThan(0)
    expect(duration).toBeLessThan(15)
  })
})
