import { episodeDescriptions } from '../config'
import type { EpisodeSource } from '../types'
import generated from './episode-sources.generated.json'

const fallbackSources: EpisodeSource[] = [
  {
    youtubeId: 'Ua2D-PM97xc',
    publishedAt: '2026-06-06',
    description: episodeDescriptions['Ua2D-PM97xc'],
  },
  {
    youtubeId: 'zX-e9LRR_ko',
    publishedAt: '2026-06-01',
    description: episodeDescriptions['zX-e9LRR_ko'],
  },
]

export const episodeSources: EpisodeSource[] =
  generated.sources.length > 0 ? generated.sources : fallbackSources

export const episodeThumbnails: Record<string, string> = generated.thumbnails

export const episodesSyncedAt: string | null = generated.syncedAt
