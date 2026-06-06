<script lang="ts">
  import { episodes } from '../../data/episodes'
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
            src={episode.thumbnail}
            alt="{episode.title} thumbnail"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 vintage-filter"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent"
          ></div>
          {#if episode.isNew}
            <div class="absolute left-3 top-3 sm:left-4 sm:top-4">
              <Badge variant="new">New</Badge>
            </div>
          {/if}
          <div
            class="absolute bottom-3 left-3 font-display text-3xl font-bold text-fog/20 sm:bottom-4 sm:left-4 sm:text-4xl"
          >
            {String(episode.number).padStart(2, '0')}
          </div>
        </div>

        <div class="p-4 sm:p-6">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h3 class="font-display text-lg font-bold text-fog sm:text-xl">
              {episode.title}
            </h3>
            <time
              datetime={episode.publishedAt}
              class="text-xs uppercase tracking-widest text-fog/40"
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
