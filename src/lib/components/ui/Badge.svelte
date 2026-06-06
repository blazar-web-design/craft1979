<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '../../utils/cn'

  let {
    variant = 'default',
    class: className = '',
    children,
  }: {
    variant?: 'default' | 'new'
    class?: string
    children: Snippet
  } = $props()
</script>

<span
  class={cn(
    'inline-flex items-center font-display font-bold uppercase',
    variant === 'new' ? 'badge-new' : 'badge-default',
    className
  )}
>
  {@render children()}
</span>
