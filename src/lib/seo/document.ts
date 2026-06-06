import { buildJsonLd } from './jsonld'

const JSON_LD_ATTR = 'data-craft1979-jsonld'

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
