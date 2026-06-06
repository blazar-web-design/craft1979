<script lang="ts">
  import type { Snippet } from 'svelte'
  import Icon from './Icon.svelte'

  let {
    href,
    class: className = '',
    children,
  }: {
    href: string
    class?: string
    children: Snippet
  } = $props()
</script>

<a {href} target="_blank" rel="noopener noreferrer" class={className}>
  {@render children()}
  <Icon name="external" size={14} class="ml-1 opacity-60" />
</a>
