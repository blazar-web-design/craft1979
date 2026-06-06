import { urls } from '../config'
import type { Episode, EpisodeSource } from '../types'

const ROMAN_NUMERALS = [
  '',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
  'XIII',
  'XIV',
  'XV',
  'XVI',
  'XVII',
  'XVIII',
  'XIX',
  'XX',
]

export function toRomanNumeral(value: number) {
  return ROMAN_NUMERALS[value] ?? String(value)
}

export function formatEpisodeDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

export function buildEpisodes(sources: EpisodeSource[]): Episode[] {
  const sorted = [...sources].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const total = sorted.length
  const latestId = sorted[0]?.youtubeId

  return sorted.map((source, index) => {
    const number = total - index

    return {
      id: `episode-${number}`,
      number,
      title: `Episode ${toRomanNumeral(number)}`,
      description: source.description,
      youtubeId: source.youtubeId,
      youtubeUrl: urls.youtubeWatch(source.youtubeId),
      thumbnail: urls.youtubeThumbnail(source.youtubeId),
      publishedAt: source.publishedAt,
      formattedDate: formatEpisodeDate(source.publishedAt),
      isNew: source.youtubeId === latestId,
    }
  })
}

export function getLatestEpisode(episodeList: Episode[]) {
  return episodeList[0]
}

export function formatNewEpisodeBanner(title: string) {
  return `${title} is now out!`
}
