export function assetPath(path: string) {
  if (/^https?:\/\//.test(path)) return path

  const base = import.meta.env.BASE_URL
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${base}${normalized}`
}

export function siteRoot() {
  return import.meta.env.BASE_URL
}
