import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AuthGuard from '@/components/AuthGuard'
import { LOGIN_KEY } from '@/constants'

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('AuthGuard', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('when not authenticated redirect to Login page', () => {
    renderWithRouter(
      <AuthGuard>
        <p>Protected Content</p>
      </AuthGuard>
    )

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  test('when authenticated show child content', () => {
    localStorage.setItem(LOGIN_KEY, JSON.stringify(true))

    renderWithRouter(
      <AuthGuard>
        <p>Protected Content</p>
      </AuthGuard>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })
})
