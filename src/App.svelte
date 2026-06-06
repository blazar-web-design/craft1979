<script lang="ts">
  import Shell from './lib/components/layout/Shell.svelte'
  import AboutSection from './lib/components/home/AboutSection.svelte'
  import AnnouncementBanner from './lib/components/home/AnnouncementBanner.svelte'
  import EpisodeList from './lib/components/home/EpisodeList.svelte'
  import Hero from './lib/components/home/Hero.svelte'
  import SupportSection from './lib/components/home/SupportSection.svelte'
  import HeadMeta from './lib/components/seo/HeadMeta.svelte'
</script>

<HeadMeta />

<Shell>
  <AnnouncementBanner />
  <Hero />
  <EpisodeList />
  <AboutSection />
  <SupportSection />
</Shell>
