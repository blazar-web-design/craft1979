<script lang="ts">
  import { assets } from '../../config'
  import { episodes } from '../../data/episodes'
  import { assetPath } from '../../utils/asset-path'
  import Badge from '../ui/Badge.svelte'
  import Button from '../ui/Button.svelte'
  import Card from '../ui/Card.svelte'
  import Icon from '../ui/Icon.svelte'
  import Section from '../ui/Section.svelte'
</script>

<Section id="episodes" title="Episodes">
  <div class="grid gap-6 sm:gap-8 md:grid-cols-2">
    {#each episodes as episode (episode.id)}
      <Card class="group overflow-hidden">
        <div class="relative aspect-video overflow-hidden">
          <img
            src={assetPath(episode.thumbnail)}
            alt="{episode.title} thumbnail"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover"
          />
          <img
            src={assetPath(assets.episodeThumbWebp(episode.number))}
            alt=""
            aria-hidden="true"
            width="1280"
            height="720"
            decoding="async"
            class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {#if episode.isNew}
            <div class="absolute left-3 top-3 sm:left-4 sm:top-4">
              <Badge variant="new">New</Badge>
            </div>
          {/if}
        </div>

        <div class="p-4 sm:p-6">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h3 class="font-display text-lg font-bold text-fog sm:text-xl">
              {episode.title}
            </h3>
            <time
              datetime={episode.publishedAt}
              class="text-xs uppercase tracking-widest text-fog/60"
            >
              {episode.formattedDate}
            </time>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-fog/60">
            {episode.description}
          </p>
          <div class="mt-5 sm:mt-6">
            <Button href={episode.youtubeUrl} variant="primary" size="md">
              <Icon name="play" size={18} />
              Watch on YouTube
            </Button>
          </div>
        </div>
      </Card>
    {/each}
  </div>
</Section>
