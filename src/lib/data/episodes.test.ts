import { describe, expect, it } from 'vitest'
import { episodes } from './episodes'

describe('episodes', () => {
  it('lists episodes in descending order', () => {
    expect(episodes[0].number).toBeGreaterThan(episodes[1].number)
  })

  it('marks the latest episode as new', () => {
    const latest = episodes.find((episode) => episode.isNew)
    expect(latest?.number).toBe(episodes[0].number)
    expect(latest?.youtubeUrl).toBe(
      'https://www.youtube.com/watch?v=Ua2D-PM97xc'
    )
  })

  it('includes valid youtube links for every episode', () => {
    for (const episode of episodes) {
      expect(episode.youtubeUrl).toMatch(
        /^https:\/\/www\.youtube\.com\/watch\?v=/
      )
    }
  })

  it('uses synced local thumbnails when available', () => {
    for (const episode of episodes) {
      expect(episode.thumbnail).toMatch(/^\/images\/episode-\d+-thumb\.jpg$/)
    }
  })
})
