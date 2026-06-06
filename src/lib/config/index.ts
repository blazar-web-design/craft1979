import type { NavLink, SocialLink } from '../types'

export const channel = {
  id: 'UCsnUwRoQuUwefJypDf0TXGA',
  handle: 'LatentDiffusion',
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
}

export const assets = {
  logo: '/images/channel-avatar.jpg',
  heroBackground: '/images/hero-forest.png',
  heroPortrait: '/images/hero-portrait.jpg',
  about: '/images/crafting-table.png',
  og: '/images/og.webp',
  episodeThumb: (number: number) => `/images/episode-${number}-thumb.jpg`,
  favicon32: '/favicon-32.png',
  favicon192: '/favicon-192.png',
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
  year: 1979,
  author: channel.displayName,
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
]

export const seo = {
  title: `${site.name} | AI Minecraft Cinema`,
  description: `${site.description} Watch episodes from ${channel.displayName} on YouTube.`,
  keywords: [
    'Craft 1979',
    'Minecraft',
    'AI video',
    'Latent Diffusion',
    '1979',
    'cinematic Minecraft',
    'AI generated',
    'YouTube series',
  ],
  author: channel.displayName,
  locale: 'en_US',
  themeColor: '#1a2e1a',
  ogImage: assets.og,
  ogImageAlt:
    'Craft 1979 promotional frame showing a rugged survivor in a vintage 1970s film style',
  twitterCard: 'summary_large_image' as const,
  robots: 'index, follow, max-image-preview:large',
}
