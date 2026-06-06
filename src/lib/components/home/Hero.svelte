<script lang="ts">
  import { episodes } from '../../data/episodes'
  import { site } from '../../data/site'
  import { getLatestEpisode } from '../../utils/episodes'
  import Button from '../ui/Button.svelte'
  import CraftGrid from '../ui/CraftGrid.svelte'
  import Icon from '../ui/Icon.svelte'

  const latest = getLatestEpisode(episodes)
</script>

<section class="relative overflow-hidden">
  <div class="absolute inset-0">
    <img
      src={site.heroBackground}
      alt=""
      class="h-full w-full object-cover opacity-40 vintage-filter"
    />
    <div
      class="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/80 to-forest-950"
    ></div>
  </div>

  <div
    class="relative mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-20 md:gap-10 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-28"
  >
    <div>
      <h1
        class="font-display text-4xl font-bold leading-none tracking-tight text-fog sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {site.name}
      </h1>
      <p
        class="mt-4 max-w-lg text-base leading-relaxed text-fog/70 sm:mt-6 sm:text-lg"
      >
        {site.tagline}
      </p>
      {#if latest}
        <div
          class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
        >
          <Button
            href={latest.youtubeUrl}
            variant="primary"
            size="lg"
            class="w-full sm:w-auto"
          >
            <Icon name="play" size={20} />
            Watch latest
          </Button>
          <Button
            href="#episodes"
            variant="secondary"
            size="lg"
            class="w-full sm:w-auto"
          >
            <Icon name="film" size={20} />
            All episodes
          </Button>
        </div>
      {/if}
    </div>

    <div class="relative mx-auto w-full max-w-sm md:max-w-md lg:mx-0">
      <div
        class="absolute -right-3 -top-3 opacity-30 md:-right-4 md:-top-4"
        aria-hidden="true"
      >
        <CraftGrid size="md" class="md:hidden" />
        <CraftGrid size="lg" class="hidden md:block" />
      </div>
      <img
        src={site.heroPortrait}
        alt="A frame from Craft 1979 Episode I"
        class="relative z-10 w-full vintage-filter shadow-block border-2 border-forest-700"
      />
    </div>
  </div>
</section>
