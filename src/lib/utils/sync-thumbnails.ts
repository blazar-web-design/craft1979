import { assets, urls } from '../config'

export function isValidThumbnailBuffer(buffer: Buffer) {
  return buffer.length >= 1000
}

export async function fetchFirstThumbnail(
  youtubeId: string,
  fetchFn: typeof fetch = fetch
) {
  for (const url of urls.youtubeThumbnailCandidates(youtubeId)) {
    const response = await fetchFn(url)
    if (!response.ok) continue

    const buffer = Buffer.from(await response.arrayBuffer())
    if (!isValidThumbnailBuffer(buffer)) continue

    return buffer
  }

  return null
}

export function episodeThumbnailFilename(number: number) {
  return `episode-${number}-thumb.jpg`
}

export function episodeThumbnailAsset(number: number) {
  return assets.episodeThumb(number)
}
