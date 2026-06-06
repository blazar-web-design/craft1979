<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '../../utils/cn'

  let {
    id,
    title,
    subtitle,
    class: className = '',
    children,
  }: {
    id?: string
    title?: string
    subtitle?: string
    class?: string
    children: Snippet
  } = $props()
</script>

<section {id} class={cn('relative py-14 md:py-20', className)}>
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    {#if title}
      <header class="mb-8 md:mb-10">
        <h2
          class="font-display text-2xl font-bold tracking-tight text-fog sm:text-3xl md:text-4xl"
        >
          {title}
        </h2>
        {#if subtitle}
          <p class="mt-3 max-w-2xl text-sm text-fog/60 sm:text-base">
            {subtitle}
          </p>
        {/if}
      </header>
    {/if}
    {@render children()}
  </div>
</section>
