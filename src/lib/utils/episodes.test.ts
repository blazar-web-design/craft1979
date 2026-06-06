import { describe, expect, it } from 'vitest'
import {
  buildEpisodes,
  formatEpisodeDate,
  formatNewEpisodeBanner,
  toRomanNumeral,
} from './episodes'

describe('buildEpisodes', () => {
  it('sorts by published date and numbers episodes automatically', () => {
    const episodes = buildEpisodes([
      {
        youtubeId: 'older',
        publishedAt: '2026-01-01',
        description: 'First',
      },
      {
        youtubeId: 'newer',
        publishedAt: '2026-06-01',
        description: 'Second',
      },
    ])

    expect(episodes[0].number).toBe(2)
    expect(episodes[0].youtubeId).toBe('newer')
    expect(episodes[0].title).toBe('Episode II')
    expect(episodes[1].number).toBe(1)
  })

  it('marks only the latest episode as new', () => {
    const episodes = buildEpisodes([
      {
        youtubeId: 'ep-2',
        publishedAt: '2026-06-01',
        description: 'Latest',
      },
      {
        youtubeId: 'ep-1',
        publishedAt: '2026-01-01',
        description: 'Older',
      },
    ])

    expect(episodes[0].isNew).toBe(true)
    expect(episodes[1].isNew).toBe(false)
  })

  it('formats published dates for display', () => {
    expect(formatEpisodeDate('2026-06-06')).toBe('June 6, 2026')
  })

  it('includes formatted dates on episodes', () => {
    const [episode] = buildEpisodes([
      {
        youtubeId: 'abc123',
        publishedAt: '2026-06-01',
        description: 'Test',
      },
    ])

    expect(episode.formattedDate).toBe('June 1, 2026')
  })

  it('formats new episode banner copy from episode title', () => {
    expect(formatNewEpisodeBanner('Episode II')).toBe('Episode II is now out!')
  })

  it('derives youtube urls and falls back to youtube thumbnails', () => {
    const [episode] = buildEpisodes([
      {
        youtubeId: 'abc123',
        publishedAt: '2026-06-01',
        description: 'Test',
      },
    ])

    expect(episode.youtubeUrl).toBe('https://www.youtube.com/watch?v=abc123')
    expect(episode.thumbnail).toBe(
      'https://i.ytimg.com/vi/abc123/maxresdefault.jpg'
    )
  })

  it('prefers synced local thumbnails when available', () => {
    const [episode] = buildEpisodes(
      [
        {
          youtubeId: 'abc123',
          publishedAt: '2026-06-01',
          description: 'Test',
        },
      ],
      { abc123: '/images/episode-1-thumb.jpg' }
    )

    expect(episode.thumbnail).toBe('/images/episode-1-thumb.jpg')
  })
})

describe('toRomanNumeral', () => {
  it('formats values up to XX', () => {
    expect(toRomanNumeral(1)).toBe('I')
    expect(toRomanNumeral(4)).toBe('IV')
    expect(toRomanNumeral(9)).toBe('IX')
    expect(toRomanNumeral(20)).toBe('XX')
  })

  it('falls back to decimal values above XX', () => {
    expect(toRomanNumeral(0)).toBe('')
    expect(toRomanNumeral(21)).toBe('21')
    expect(toRomanNumeral(25)).toBe('25')
  })
})
