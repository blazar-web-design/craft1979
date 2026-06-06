<script lang="ts">
  import { site } from '../../data/site'
  import { cn } from '../../utils/cn'

  let {
    size = 'md',
    class: className = '',
  }: {
    size?: 'sm' | 'md'
    class?: string
  } = $props()

  const sizes = {
    sm: 'h-9 w-9 sm:h-10 sm:w-10',
    md: 'h-10 w-10 sm:h-11 sm:w-11',
  }
</script>

<img
  src={site.logo}
  alt=""
  class={cn(
    'shrink-0 border-2 border-forest-700 object-cover shadow-block vintage-filter',
    sizes[size],
    className
  )}
/>
