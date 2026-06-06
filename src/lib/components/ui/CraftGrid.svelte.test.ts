import { render } from 'vitest-browser-svelte'
import { describe, expect, it } from 'vitest'
import CraftGrid from './CraftGrid.svelte'

describe('CraftGrid', () => {
  it('renders a three by three crafting grid', async () => {
    const screen = await render(CraftGrid, {
      size: 'sm',
    })

    const cells = screen.container.querySelectorAll('.grid > div')
    expect(cells.length).toBe(9)
  })
})
