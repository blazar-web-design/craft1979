import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { playwright } from '@vitest/browser-playwright'
import { buildRobotsTxt, buildSitemapXml } from './src/lib/seo/bundle'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

function resolveSiteUrl() {
  return process.env.VITE_SITE_URL?.replace(/\/$/, '') ?? ''
}

function resolveBase() {
  const configured = process.env.BASE_PATH
  if (!configured || configured === '/') return '/'
  return configured.endsWith('/') ? configured : `${configured}/`
}

function seoPlugin(): Plugin {
  return {
    name: 'craft1979-seo',
    transformIndexHtml(html) {
      const siteUrl = resolveSiteUrl()
      return html
        .replaceAll('__SITE_URL__', siteUrl)
        .replace(
          /<link rel="stylesheet" crossorigin href="([^"]+)">/,
          '<link rel="preload" as="style" href="$1" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="$1"></noscript>'
        )
        .replace(
          /<script type="module" crossorigin src="([^"]+)"><\/script>/,
          '<link rel="modulepreload" crossorigin href="$1"><script type="module" crossorigin src="$1"></script>'
        )
    },
    closeBundle() {
      const siteUrl = resolveSiteUrl()
      const distDir = path.resolve(rootDir, 'dist')

      fs.writeFileSync(
        path.join(distDir, 'robots.txt'),
        buildRobotsTxt(siteUrl)
      )

      if (!siteUrl) return

      fs.writeFileSync(
        path.join(distDir, 'sitemap.xml'),
        buildSitemapXml(siteUrl)
      )
    },
  }
}

export default defineConfig({
  base: resolveBase(),
  plugins: [tailwindcss(), svelte(), seoPlugin()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts'],
          exclude: ['src/**/*.svelte.test.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          include: ['src/**/*.svelte.test.ts'],
          setupFiles: ['vitest-browser-svelte'],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
            headless: true,
          },
        },
      },
    ],
  },
})
