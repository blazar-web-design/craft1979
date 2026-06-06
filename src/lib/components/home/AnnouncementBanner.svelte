<script lang="ts">
  import { urls } from '../../config'
  import { episodes } from '../../data/episodes'
  import {
    formatNewEpisodeBanner,
    getLatestEpisode,
  } from '../../utils/episodes'
  import Badge from '../ui/Badge.svelte'
  import Icon from '../ui/Icon.svelte'

  const latest = getLatestEpisode(episodes)
</script>

{#if latest?.isNew}
  <div
    class="border-b border-forest-700 bg-forest-900/95"
    role="status"
    aria-live="polite"
  >
    <div class="mx-auto flex max-w-6xl items-center">
      <div class="w-px shrink-0 bg-harvest/50" aria-hidden="true"></div>

      <div
        class="flex flex-1 items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4"
      >
        <div class="min-w-0">
          <Badge variant="new">New</Badge>
          <p class="mt-1.5 font-display text-sm tracking-wide text-fog sm:mt-2">
            {formatNewEpisodeBanner(latest.title)}
          </p>
          <time
            datetime={latest.publishedAt}
            class="mt-1 block text-xs uppercase tracking-widest text-fog/60"
          >
            {latest.formattedDate}
          </time>
        </div>
      </div>

      <a
        href={latest.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Watch {latest.title} on YouTube"
        class="group/thumb relative hidden aspect-video w-32 shrink-0 overflow-hidden border-l border-forest-700 bg-forest-950 md:block lg:w-40"
      >
        <img
          src={urls.youtubeThumbnail(latest.youtubeId)}
          alt=""
          width="1280"
          height="720"
          decoding="async"
          class="h-full w-full object-contain object-center transition-opacity duration-200 group-hover/thumb:opacity-50"
        />
        <span
          class="pointer-events-none absolute inset-0 flex items-center justify-center bg-forest-950/40 opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100"
        >
          <Icon name="youtube" size={28} class="text-fog" />
        </span>
      </a>
    </div>
  </div>
{/if}
