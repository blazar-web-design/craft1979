import { seo as seoConfig, site } from '../config'
import { episodes } from '../data/episodes'
import { getLatestEpisode } from '../utils/episodes'

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

export function buildSocialDescription() {
  const latest = getLatestEpisode(episodes)
  if (latest) {
    return `${site.description} ${latest.title} is out now.`
  }
  return seo.description
}
