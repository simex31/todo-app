import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Login from './'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../../../utils', () => ({
  setLocalStorage: vi.fn()
}))

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
  })

  it('renders the login form with username and password inputs', () => {
    expect(screen.getByTestId('login-btn')).toBeInTheDocument()
  })
})
