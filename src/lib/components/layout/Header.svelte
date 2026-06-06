<script lang="ts">
  import { navLinks, site } from '../../data/site'
  import Icon from '../ui/Icon.svelte'
  import SiteLogo from '../ui/SiteLogo.svelte'

  let menuOpen = $state(false)

  function closeMenu() {
    menuOpen = false
  }
</script>

<header
  class="sticky top-0 z-40 border-b-2 border-forest-800/80 bg-forest-950/90 backdrop-blur-md"
>
  <div
    class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4"
  >
    <a href="/" class="group flex items-center gap-3" onclick={closeMenu}>
      <SiteLogo class="opacity-90 transition-opacity group-hover:opacity-100" />
      <span class="font-display text-lg font-bold tracking-tight text-fog">
        {site.name}
      </span>
    </a>

    <nav class="hidden items-center gap-6 md:flex" aria-label="Main">
      {#each navLinks as link (link.id)}
        <a
          href={link.href}
          class="text-sm uppercase tracking-widest text-fog/60 transition-colors hover:text-harvest"
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <button
      type="button"
      class="flex h-10 w-10 items-center justify-center border-2 border-forest-700 text-fog/70 transition-colors hover:border-forest-600 hover:text-fog md:hidden"
      aria-expanded={menuOpen}
      aria-controls="mobile-nav"
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      onclick={() => (menuOpen = !menuOpen)}
    >
      <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
    </button>
  </div>

  {#if menuOpen}
    <nav
      id="mobile-nav"
      class="border-t border-forest-800 bg-forest-950 px-4 py-3 md:hidden"
      aria-label="Mobile"
    >
      <ul class="flex flex-col gap-1">
        {#each navLinks as link (link.id)}
          <li>
            <a
              href={link.href}
              class="block px-2 py-3 font-display text-sm uppercase tracking-widest text-fog/70 transition-colors hover:text-harvest"
              onclick={closeMenu}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</header>
