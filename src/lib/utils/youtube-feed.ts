import { episodeDescriptions, urls, youtube } from '../config'
import type { EpisodeSource } from '../types'

export type FeedEntry = {
  youtubeId: string
  title: string
  publishedAt: string
  description: string
  thumbnailUrl: string
}

function readTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))
  return match?.[1]?.trim() ?? ''
}

function readNamespacedTag(block: string, tag: string) {
  const match = block.match(
    new RegExp(
      `<(?:yt:|media:)?${tag}[^>]*>([\\s\\S]*?)</(?:yt:|media:)?${tag}>`
    )
  )
  return match?.[1]?.trim() ?? ''
}

function readThumbnail(block: string) {
  const match = block.match(/<media:thumbnail url="([^"]+)"/)
  return match?.[1] ?? ''
}

function decodeXmlEntities(text: string) {
  let decoded = text
  decoded = decoded.split('&quot;').join('"')
  decoded = decoded.split('&#39;').join("'")
  decoded = decoded.split('&apos;').join("'")
  return decoded.split('&amp;').join('&')
}

export function summarizeDescription(text: string) {
  const line = decodeXmlEntities(text)
    .split('\n')
    .map((part) => part.trim())
    .find(Boolean)

  if (!line) return ''
  return line.length > 160 ? `${line.slice(0, 157)}...` : line
}

export function parseYoutubeFeed(xml: string): FeedEntry[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? []

  return entries.map((entry) => ({
    youtubeId: readNamespacedTag(entry, 'videoId'),
    title: readTag(entry, 'title'),
    publishedAt: readTag(entry, 'published').slice(0, 10),
    description: readNamespacedTag(entry, 'description'),
    thumbnailUrl: readThumbnail(entry),
  }))
}

export function filterCraftEpisodes(entries: FeedEntry[]) {
  return entries.filter((entry) => youtube.titlePattern.test(entry.title))
}

export function toEpisodeSources(
  entries: FeedEntry[],
  overrides: Record<string, string> = episodeDescriptions
): EpisodeSource[] {
  return entries.map((entry) => ({
    youtubeId: entry.youtubeId,
    publishedAt: entry.publishedAt,
    description:
      overrides[entry.youtubeId] ?? summarizeDescription(entry.description),
  }))
}

export async function fetchCraftEpisodeSources() {
  const response = await fetch(youtube.feedUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube feed: ${response.status}`)
  }

  const xml = await response.text()
  return toEpisodeSources(filterCraftEpisodes(parseYoutubeFeed(xml)))
}

export { urls, youtube }
