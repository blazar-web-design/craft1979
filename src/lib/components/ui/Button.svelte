<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '../../utils/cn'

  type Variant = 'primary' | 'secondary' | 'ghost'
  type Size = 'sm' | 'md' | 'lg'

  let {
    href,
    variant = 'primary',
    size = 'md',
    class: className = '',
    children,
    ...rest
  }: {
    href?: string
    variant?: Variant
    size?: Size
    class?: string
    children: Snippet
    [key: string]: unknown
  } = $props()

  const base =
    'inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-colors duration-200 border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest/60 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950'

  const variants: Record<Variant, string> = {
    primary:
      'bg-denim text-white border-denim-dark shadow-block hover:bg-denim-light',
    secondary:
      'bg-bark text-fog border-bark-light shadow-block hover:bg-bark-light',
    ghost:
      'bg-transparent text-fog/80 border-transparent hover:text-harvest hover:border-harvest/30',
  }

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  }

  const classes = $derived(cn(base, variants[variant], sizes[size], className))
</script>

{#if href}
  <a {href} class={classes} {...rest}>
    {@render children()}
  </a>
{:else}
  <button class={classes} type="button" {...rest}>
    {@render children()}
  </button>
{/if}
