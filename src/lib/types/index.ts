export type EpisodeSource = {
  youtubeId: string
  publishedAt: string
  description: string
}

export type Episode = {
  id: string
  number: number
  title: string
  description: string
  youtubeId: string
  youtubeUrl: string
  thumbnail: string
  publishedAt: string
  formattedDate: string
  isNew: boolean
}

export type NavLink = {
  id: string
  label: string
  href: string
}

export type SocialLink = {
  id: string
  label: string
  href: string
  icon: string
}
