<script lang="ts">
  import { site } from '../../data/site'
  import Button from '../ui/Button.svelte'
  import Card from '../ui/Card.svelte'
  import Icon from '../ui/Icon.svelte'
  import Section from '../ui/Section.svelte'
</script>

<Section
  id="support"
  title="Support the series"
  subtitle="Help Latent Diffusion keep pushing AI cinema forward."
>
  <div class="grid gap-5 sm:gap-6 md:grid-cols-2">
    <Card class="p-5 sm:p-8">
      <Icon name="youtube" size={32} class="text-denim-light" />
      <h3 class="mt-4 font-display text-xl font-bold text-fog">YouTube</h3>
      <p class="mt-2 text-sm leading-relaxed text-fog/60">
        Subscribe and watch every episode as it drops. Like and share to spread
        the word.
      </p>
      <div class="mt-6">
        <Button href={site.channelUrl} variant="primary">
          <Icon name="youtube" size={18} />
          Visit channel
        </Button>
      </div>
    </Card>

    <Card class="p-5 sm:p-8">
      <Icon name="patreon" size={32} class="text-harvest" />
      <h3 class="mt-4 font-display text-xl font-bold text-fog">Patreon</h3>
      <p class="mt-2 text-sm leading-relaxed text-fog/60">
        Back the creators directly and get access to behind-the-scenes content
        and early releases.
      </p>
      <div class="mt-6">
        <Button href={site.patreonUrl} variant="secondary">
          <Icon name="patreon" size={18} />
          Become a patron
        </Button>
      </div>
    </Card>
  </div>
</Section>
