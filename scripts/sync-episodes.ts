import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { episodeDescriptions, youtube } from '../src/lib/config'
import {
  episodeThumbnailAsset,
  episodeThumbnailFilename,
  fetchFirstThumbnail,
} from '../src/lib/utils/sync-thumbnails'
import {
  filterCraftEpisodes,
  parseYoutubeFeed,
  toEpisodeSources,
} from '../src/lib/utils/youtube-feed'

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const generatedPath = path.join(
  rootDir,
  'src/lib/data/episode-sources.generated.json'
)
const imagesDir = path.join(rootDir, 'public/images')

async function downloadThumbnail(youtubeId: string, number: number) {
  const buffer = await fetchFirstThumbnail(youtubeId)
  if (buffer) {
    const target = path.join(imagesDir, episodeThumbnailFilename(number))
    await fs.writeFile(target, buffer)
  }

  return episodeThumbnailAsset(number)
}

async function main() {
  const response = await fetch(youtube.feedUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube feed: ${response.status}`)
  }

  const xml = await response.text()
  const craftEntries = filterCraftEpisodes(parseYoutubeFeed(xml))

  if (craftEntries.length === 0) {
    throw new Error('No Craft 1979 episodes found in YouTube feed')
  }

  const sources = toEpisodeSources(craftEntries, episodeDescriptions)
  await fs.mkdir(imagesDir, { recursive: true })

  const total = sources.length
  const thumbnails: Record<string, string> = {}

  for (const [index, source] of sources.entries()) {
    const number = total - index
    thumbnails[source.youtubeId] = await downloadThumbnail(
      source.youtubeId,
      number
    )
  }

  const payload = {
    syncedAt: new Date().toISOString(),
    sources,
    thumbnails,
  }

  await fs.writeFile(generatedPath, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(`Synced ${sources.length} episodes from ${youtube.feedUrl}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
