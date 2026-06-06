import { seo as seoConfig } from '../config'
import { episodes } from '../data/episodes'

export const seo = seoConfig

export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '')
  if (configured) return configured
  if (typeof window !== 'undefined') return window.location.origin
  return ''
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path
  const base = getSiteUrl()
  if (!base) return path
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function getPrimaryEpisode() {
  return episodes.find((episode) => episode.isNew) ?? episodes[0]
}
