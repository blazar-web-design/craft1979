<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '../../utils/cn'

  let {
    class: className = '',
    children,
  }: {
    class?: string
    children: Snippet
  } = $props()
</script>

<div
  class={cn(
    'bg-forest-900/80 border-2 border-forest-700 shadow-block backdrop-blur-sm',
    className
  )}
>
  {@render children()}
</div>
