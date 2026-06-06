# Craft 1979

Website for [Craft 1979](https://www.youtube.com/watch?v=zX-e9LRR_ko), AI-generated Minecraft episodes by [Latent Diffusion](https://www.youtube.com/@LatentDiffusion).

## Stack

- Svelte 5
- Vite 8
- Tailwind CSS 4
- PNPM 11
- MDI icons

## Setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Set `VITE_SITE_URL` in `.env` before production builds so canonical, Open Graph, and sitemap URLs resolve correctly.

## Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `pnpm dev`          | Start dev server         |
| `pnpm build`        | Production build         |
| `pnpm preview`      | Preview production build |
| `pnpm check`        | Type check               |
| `pnpm lint`         | ESLint                   |
| `pnpm format`       | Prettier                 |
| `pnpm format:check` | Prettier check           |
| `pnpm test`         | Run Vitest               |
| `pnpm test:watch`   | Vitest watch             |

## Structure

```
src/lib/
  config/      URLs, assets, YouTube RSS, site copy, SEO
  components/
    layout/    Header, Footer, Shell
    ui/        Button, Card, Icon, CraftGrid, etc.
    home/      Page sections
  data/        Generated episode feed data
  seo/         JSON-LD helpers
  types/       Shared types
  utils/       Episode and feed helpers
```

Change channel links, image paths, RSS settings, and episode copy in `src/lib/config/index.ts`.

## Images

- `public/images/channel-avatar.jpg` - Latent Diffusion YouTube profile (header logo and favicon)
- `public/images/hero-portrait.jpg` - Episode I frame at 4:51 (`zX-e9LRR_ko`)

## CI

GitHub Actions runs on every push and pull request:

- lint
- format check
- type check
- tests (unit and browser)
- production build with YouTube RSS sync

A daily workflow also syncs new episodes from the YouTube RSS feed and commits updates when they change.

## Episode sync

Episodes are fetched automatically from the Latent Diffusion YouTube RSS feed.

```bash
pnpm sync:episodes
```

This runs before every `pnpm build` and:

- Finds videos titled `CRAFT (1979)` on the channel
- Writes `src/lib/data/episode-sources.generated.json`
- Downloads thumbnails to `public/images/episode-N-thumb.jpg`
- Updates dates, badges, and the announcement banner through the existing episode builder

Optional short descriptions live in `episodeDescriptions` inside `src/lib/config/index.ts`. If an episode has no override, the first line of the YouTube description is used.

Pure browser-side fetching is not used because YouTube blocks RSS requests with CORS. A serverless proxy or the YouTube Data API would be needed for live runtime updates.

## SEO

- Meta, Open Graph, and Twitter cards in `index.html`
- JSON-LD for WebSite, Organization, series, episodes, and VideoObject
- Local thumbnails in `public/images/`
- Self-hosted fonts via `@fontsource`
- `robots.txt`, `site.webmanifest`, and build-time `sitemap.xml`

## Links

- [Episode 1](https://www.youtube.com/watch?v=zX-e9LRR_ko)
- [Episode 2](https://www.youtube.com/watch?v=Ua2D-PM97xc)
- [YouTube Channel](https://www.youtube.com/@LatentDiffusion)
- [Patreon](https://www.patreon.com/cw/LatentDiffusion)

## Disclaimer

This is an unofficial fan-made concept website. It is not affiliated with, endorsed by, or produced by [Latent Diffusion](https://www.youtube.com/@LatentDiffusion), Mojang, or Microsoft.

All ownership of Craft 1979, including episodes, video footage, thumbnails, channel branding, and related creative assets, remains with Latent Diffusion and their respective rights holders. Minecraft is a trademark of Mojang AB. Microsoft and Mojang do not sponsor or authorize this project.

The site code in this repository is an independent design exercise by blazar web design. Third-party media used for reference or display is not licensed for redistribution through this project.

## License

MIT License. Copyright (c) 2026 blazar web design. Applies to the source code in this repository only. See [LICENSE](LICENSE).
