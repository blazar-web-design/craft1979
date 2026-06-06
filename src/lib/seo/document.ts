import { buildJsonLd } from './jsonld'
import { buildSocialDescription, seo } from './config'

const JSON_LD_ATTR = 'data-craft1979-jsonld'

function setMetaContent(
  attr: 'name' | 'property',
  key: string,
  content: string
) {
  const selector = `meta[${attr}="${key}"]`
  let element = document.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export function applyPageMeta() {
  if (typeof document === 'undefined') return

  const description = buildSocialDescription()
  document.title = seo.title
  setMetaContent('name', 'description', description)
  setMetaContent('property', 'og:description', description)
  setMetaContent('name', 'twitter:description', description)
}

export function applyJsonLd() {
  if (typeof document === 'undefined') return

  document
    .querySelectorAll(`script[${JSON_LD_ATTR}]`)
    .forEach((node) => node.remove())

  for (const item of buildJsonLd()) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute(JSON_LD_ATTR, 'true')
    script.textContent = JSON.stringify(item)
    document.head.appendChild(script)
  }
}
