<script lang="ts">
  import { cn } from '../../utils/cn'

  let {
    class: className = '',
    size = 'md',
  }: {
    class?: string
    size?: 'sm' | 'md' | 'lg'
  } = $props()

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }
</script>

<div
  class={cn(
    'grid grid-cols-3 grid-rows-3 gap-px bg-bark-light/40 p-px',
    sizeClasses[size],
    className
  )}
  aria-hidden="true"
>
  {#each Array(9) as _, i (i)}
    <div
      class={cn(
        'bg-bark/60',
        i === 4 && 'bg-denim/30',
        (i === 0 || i === 2 || i === 6 || i === 8) && 'bg-bark-light/20'
      )}
    ></div>
  {/each}
</div>
