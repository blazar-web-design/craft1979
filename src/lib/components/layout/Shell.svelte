<script lang="ts">
  import type { Snippet } from 'svelte'
  import FilmGrain from '../ui/FilmGrain.svelte'
  import ConceptBanner from './ConceptBanner.svelte'
  import Footer from './Footer.svelte'
  import Header from './Header.svelte'

  let { children }: { children: Snippet } = $props()
</script>

<div class="relative min-h-screen bg-forest-950 text-fog vignette">
  <FilmGrain />
  <ConceptBanner />
  <Header />
  <main>
    {@render children()}
  </main>
  <Footer />
</div>
