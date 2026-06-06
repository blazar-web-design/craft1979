<script lang="ts">
  import { episodes } from '../../data/episodes'
  import { getLatestEpisode } from '../../utils/episodes'
  import Badge from '../ui/Badge.svelte'
  import Button from '../ui/Button.svelte'
  import Icon from '../ui/Icon.svelte'

  const latest = getLatestEpisode(episodes)
</script>

{#if latest?.isNew}
  <div
    class="border-b border-forest-700 bg-forest-900/95"
    role="status"
    aria-live="polite"
  >
    <div class="mx-auto flex max-w-6xl items-stretch">
      <div class="w-px shrink-0 bg-harvest/50" aria-hidden="true"></div>

      <div
        class="flex flex-1 flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4"
      >
        <div class="flex min-w-0 items-center gap-3 sm:gap-4">
          <span
            class="font-display text-2xl font-bold leading-none tabular-nums text-fog/15 sm:text-3xl"
            aria-hidden="true"
          >
            {String(latest.number).padStart(2, '0')}
          </span>

          <div class="min-w-0">
            <Badge variant="new">New</Badge>
            <p
              class="mt-1.5 font-display text-sm tracking-wide text-fog sm:mt-2"
            >
              {latest.title} is now playing
            </p>
            <time
              datetime={latest.publishedAt}
              class="mt-1 block text-xs uppercase tracking-widest text-fog/40"
            >
              {latest.formattedDate}
            </time>
          </div>
        </div>

        <Button
          href={latest.youtubeUrl}
          variant="secondary"
          size="sm"
          class="w-full shrink-0 sm:w-auto"
        >
          <Icon name="play" size={16} />
          Watch now
        </Button>
      </div>

      <div
        class="hidden w-20 shrink-0 border-l border-forest-700 md:block lg:w-24"
      >
        <img
          src={latest.thumbnail}
          alt=""
          class="h-full w-full object-cover vintage-filter opacity-70"
        />
      </div>
    </div>
  </div>
{/if}
