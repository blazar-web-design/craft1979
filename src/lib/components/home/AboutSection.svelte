<script lang="ts">
  import { site } from '../../data/site'
  import CraftGrid from '../ui/CraftGrid.svelte'
  import Section from '../ui/Section.svelte'
</script>

<Section
  id="about"
  title="About"
  subtitle="What happens when you ask AI to remember Minecraft the way a camera would, not a screen."
>
  <div class="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
    <div class="relative">
      <img
        src={site.aboutImage}
        alt="A photorealistic crafting table in a forest"
        class="w-full vintage-filter shadow-block border-2 border-forest-700"
      />
      <div
        class="absolute -bottom-4 -right-4 hidden sm:block md:-bottom-6 md:-right-6"
        aria-hidden="true"
      >
        <CraftGrid size="md" class="opacity-60" />
      </div>
    </div>

    <div
      class="space-y-4 text-sm leading-relaxed text-fog/70 sm:space-y-5 sm:text-base"
    >
      <p>
        {site.name} is a series of AI-generated episodes from
        <a
          href={site.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-denim-light hover:text-harvest"
        >
          Latent Diffusion
        </a>
        that reimagines Minecraft as gritty, photorealistic 1970s cinema.
      </p>
      <p>
        Blocky biomes become forests shot on grainy film stock. Steve wears
        denim instead of pixels. Crafting tables look carved from burlap and
        stone. Every frame carries the weight of something found, not rendered.
      </p>
      <p>
        The result sits in an uncanny valley between game and memory, between
        nostalgia and something that never quite existed until now.
      </p>
    </div>
  </div>
</Section>
