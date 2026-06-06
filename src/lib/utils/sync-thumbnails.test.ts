import { describe, expect, it, vi } from 'vitest'
import {
  episodeThumbnailAsset,
  episodeThumbnailFilename,
  fetchFirstThumbnail,
  isValidThumbnailBuffer,
} from './sync-thumbnails'

describe('sync-thumbnails', () => {
  it('rejects tiny thumbnail buffers', () => {
    expect(isValidThumbnailBuffer(Buffer.alloc(512))).toBe(false)
    expect(isValidThumbnailBuffer(Buffer.alloc(1000))).toBe(true)
  })

  it('builds episode thumbnail filenames and asset paths', () => {
    expect(episodeThumbnailFilename(2)).toBe('episode-2-thumb.jpg')
    expect(episodeThumbnailAsset(2)).toBe('/images/episode-2-thumb.jpg')
  })

  it('returns the first valid thumbnail response', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({
        ok: true,
        arrayBuffer: async () => Buffer.alloc(1200),
      })

    const buffer = await fetchFirstThumbnail('abc123', fetchFn)

    expect(buffer?.length).toBe(1200)
    expect(fetchFn).toHaveBeenCalledTimes(2)
    expect(fetchFn.mock.calls[0][0]).toContain('maxresdefault.jpg')
    expect(fetchFn.mock.calls[1][0]).toContain('hqdefault.jpg')
  })

  it('skips responses with undersized buffers', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: async () => Buffer.alloc(64),
    })

    const buffer = await fetchFirstThumbnail('abc123', fetchFn)

    expect(buffer).toBeNull()
    expect(fetchFn).toHaveBeenCalledTimes(2)
  })

  it('returns null when every candidate fails', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: false })

    const buffer = await fetchFirstThumbnail('abc123', fetchFn)

    expect(buffer).toBeNull()
    expect(fetchFn).toHaveBeenCalledTimes(2)
  })
})
