import { channel, site, urls } from '../config'
import { episodes } from '../data/episodes'
import { absoluteUrl, getSiteUrl, seo } from './config'

type JsonLd = Record<string, unknown>

function videoObjects(): JsonLd[] {
  return episodes.map((episode) => ({
    '@type': 'VideoObject',
    '@id': `${absoluteUrl('/')}#${episode.id}`,
    name: `${site.name} ${episode.title}`,
    description: episode.description,
    thumbnailUrl: absoluteUrl(episode.thumbnail),
    uploadDate: episode.publishedAt,
    contentUrl: episode.youtubeUrl,
    embedUrl: urls.youtubeEmbed(episode.youtubeId),
    publisher: {
      '@type': 'Organization',
      name: channel.displayName,
      url: urls.youtubeChannel,
    },
    isPartOf: {
      '@id': `${absoluteUrl('/')}#series`,
    },
  }))
}

export function buildJsonLd(): JsonLd[] {
  const siteUrl = getSiteUrl() || '/'
  const graph: JsonLd[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${absoluteUrl('/')}#website`,
      url: siteUrl,
      name: site.name,
      description: site.description,
      inLanguage: 'en',
      publisher: {
        '@id': `${absoluteUrl('/')}#organization`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${absoluteUrl('/')}#organization`,
      name: channel.displayName,
      url: urls.youtubeChannel,
      sameAs: [urls.youtubeChannel, urls.patreon],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWorkSeries',
      '@id': `${absoluteUrl('/')}#series`,
      name: site.name,
      description: site.description,
      url: siteUrl,
      genre: ['Science Fiction', 'Adventure', 'AI Generated'],
      creator: {
        '@id': `${absoluteUrl('/')}#organization`,
      },
      image: absoluteUrl(seo.ogImage),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${absoluteUrl('/')}#episodes`,
      name: `${site.name} Episodes`,
      itemListElement: episodes.map((episode, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: episode.youtubeUrl,
        name: episode.title,
        image: absoluteUrl(episode.thumbnail),
      })),
    },
    ...videoObjects(),
  ]

  return graph
}
