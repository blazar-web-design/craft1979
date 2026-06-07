import type { NavLink, SocialLink } from '../types'

export const channel = {
  id: 'UCsnUwRoQuUwefJypDf0TXGA',
  displayName: 'Latent Diffusion',
}

export const urls = {
  youtubeChannel: 'https://www.youtube.com/@LatentDiffusion',
  patreon: 'https://www.patreon.com/cw/LatentDiffusion',
  youtubeFeed: (channelId = channel.id) =>
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
  youtubeWatch: (videoId: string) =>
    `https://www.youtube.com/watch?v=${videoId}`,
  youtubeEmbed: (videoId: string) => `https://www.youtube.com/embed/${videoId}`,
  youtubeThumbnailCandidates: (videoId: string) => [
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  ],
  youtubeThumbnail: (videoId: string) =>
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
}

export const assetDimensions = {
  logo: { width: 176, height: 176 },
  heroBackground: { width: 1024, height: 738 },
  heroPortrait: { width: 400, height: 300 },
  about: { width: 573, height: 737 },
  episodeThumb: { width: 1280, height: 720 },
} as const

export const assets = {
  logo: '/images/channel-avatar.jpg',
  logoWebp: '/images/channel-avatar-88.webp',
  heroBackground: '/images/hero-forest.png',
  heroBackgroundWebp: '/images/hero-forest.webp',
  heroPortrait: '/images/hero-portrait.gif',
  heroPortraitPoster: '/images/hero-portrait-poster.jpg',
  about: '/images/crafting-table.png',
  aboutWebp: '/images/crafting-table.webp',
  episodeThumbWebp: (number: number) => `/images/episode-${number}-thumb.webp`,
  og: '/images/og.webp',
  episodeThumb: (number: number) => `/images/episode-${number}-thumb.jpg`,
}

export const youtube = {
  channelId: channel.id,
  titlePattern: /CRAFT\s*\(?\s*1979\s*\)?/i,
  feedUrl: urls.youtubeFeed(channel.id),
}

export const site = {
  name: 'Craft 1979',
  tagline: 'Minecraft reimagined through 1979 film grain',
  description:
    'AI-generated episodes that turn blocky worlds into gritty, photorealistic 70s cinema.',
  channelUrl: urls.youtubeChannel,
  patreonUrl: urls.patreon,
  logo: assets.logo,
  heroPortrait: assets.heroPortrait,
  heroBackground: assets.heroBackground,
  aboutImage: assets.about,
}

export const episodeDescriptions: Record<string, string> = {
  'Ua2D-PM97xc':
    'The forest deepens. Steve faces what the blocks were always hiding beneath the leaves.',
  'zX-e9LRR_ko':
    'Where it began. A lone figure in denim walks through trees that feel too real to be rendered.',
}

export const navLinks: NavLink[] = [
  { id: 'episodes', label: 'Episodes', href: '#episodes' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'support', label: 'Support', href: '#support' },
]

export const socialLinks: SocialLink[] = [
  {
    id: 'youtube',
    label: 'YouTube',
    href: urls.youtubeChannel,
    icon: 'youtube',
  },
  {
    id: 'patreon',
    label: 'Patreon',
    href: urls.patreon,
    icon: 'patreon',
  },
  {
    id: 'rss',
    label: 'RSS',
    href: urls.youtubeFeed(),
    icon: 'rss',
  },
]

export const seo = {
  title: site.name,
  description: `${site.description} Watch episodes from ${channel.displayName} on YouTube.`,
  ogImage: assets.og,
}
