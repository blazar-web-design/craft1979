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

  it('toggles the mobile navigation menu', async () => {
    const screen = await render(Header)

    await screen.getByRole('button', { name: 'Open menu' }).click()

    const closeToggle = screen.getByRole('button', { name: 'Close menu' })
    await expect.element(closeToggle).toHaveAttribute('aria-expanded', 'true')
    await expect
      .element(screen.getByRole('navigation', { name: 'Mobile' }))
      .toBeInTheDocument()

    await closeToggle.click()

    await expect
      .element(screen.getByRole('button', { name: 'Open menu' }))
      .toHaveAttribute('aria-expanded', 'false')
  })
})
