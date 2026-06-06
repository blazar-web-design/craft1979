import { render } from 'vitest-browser-svelte'
import { describe, expect, it } from 'vitest'
import AnnouncementBanner from './AnnouncementBanner.svelte'

describe('AnnouncementBanner', () => {
  it('announces the latest episode', async () => {
    const screen = await render(AnnouncementBanner)

    await expect
      .element(screen.getByText('Episode II is now out!'))
      .toBeInTheDocument()
  })

  it('links to the latest episode on youtube', async () => {
    const screen = await render(AnnouncementBanner)

    const watchLink = screen.getByRole('link', {
      name: /watch episode ii on youtube/i,
    })
    await expect
      .element(watchLink)
      .toHaveAttribute('href', 'https://www.youtube.com/watch?v=Ua2D-PM97xc')
  })
})
