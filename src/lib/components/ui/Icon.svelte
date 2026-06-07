<script lang="ts">
  import {
    mdiYoutube,
    mdiPatreon,
    mdiPlay,
    mdiFilmstrip,
    mdiMenu,
    mdiClose,
    mdiRss,
  } from '@mdi/js'
  import { cn } from '../../utils/cn'

  type IconName =
    | 'youtube'
    | 'patreon'
    | 'play'
    | 'film'
    | 'menu'
    | 'close'
    | 'rss'

  let {
    name,
    size = 20,
    class: className = '',
  }: {
    name: IconName
    size?: number
    class?: string
  } = $props()

  const paths: Record<IconName, string> = {
    youtube: mdiYoutube,
    patreon: mdiPatreon,
    play: mdiPlay,
    film: mdiFilmstrip,
    menu: mdiMenu,
    close: mdiClose,
    rss: mdiRss,
  }
</script>

<svg
  viewBox="0 0 24 24"
  width={size}
  height={size}
  class={cn('inline-block shrink-0 fill-current', className)}
  aria-hidden="true"
>
  <path d={paths[name]} />
</svg>
