import { describe, expect, it } from 'vitest'
import { assets, channel, socialLinks, urls, youtube } from './index'

describe('config', () => {
  it('defines youtube channel and feed url', () => {
    expect(youtube.feedUrl).toBe(urls.youtubeFeed(channel.id))
    expect(youtube.feedUrl).toContain(channel.id)
  })

  it('builds youtube urls from video ids', () => {
    expect(urls.youtubeWatch('abc123')).toBe(
      'https://www.youtube.com/watch?v=abc123'
    )
    expect(urls.youtubeEmbed('abc123')).toBe(
      'https://www.youtube.com/embed/abc123'
    )
  })

  it('exposes youtube rss in social links', () => {
    const rss = socialLinks.find((link) => link.id === 'rss')
    expect(rss?.href).toBe(urls.youtubeFeed(channel.id))
    expect(rss?.icon).toBe('rss')
  })

  it('centralizes asset paths', () => {
    expect(assets.episodeThumb(2)).toBe('/images/episode-2-thumb.jpg')
    expect(assets.logo).toBe('/images/channel-avatar.jpg')
  })
})
