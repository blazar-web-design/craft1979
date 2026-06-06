import { render } from 'vitest-browser-svelte'
import { describe, expect, it } from 'vitest'
import Header from './Header.svelte'

describe('Header', () => {
  it('renders site branding', async () => {
    const screen = await render(Header)

    await expect.element(screen.getByText('Craft 1979')).toBeInTheDocument()
  })

  it('renders a mobile menu toggle', async () => {
    const screen = await render(Header)

    await expect
      .element(screen.getByRole('button', { name: 'Open menu' }))
      .toBeInTheDocument()
  })

  it('renders main navigation links', async () => {
    const screen = await render(Header)

    await expect
      .element(screen.getByRole('link', { name: 'Episodes' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: 'About' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: 'Support' }))
      .toBeInTheDocument()
  })
})
