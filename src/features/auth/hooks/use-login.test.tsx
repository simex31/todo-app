import { renderHook, waitFor } from '@testing-library/react'
import { useLogin } from '.'
import { ACCOUNT_MOCK, LOGIN_KEY, ROUTES } from '@/constants'
import { setLocalStorage } from '@/utils'
import { vi, Mock } from 'vitest'
import { useNavigate } from 'react-router-dom'

// Mock dependencies
vi.mock('@/utils', () => ({
  setLocalStorage: vi.fn()
}))

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

describe('useLogin', () => {
  const mockNavigate = vi.fn()

  beforeEach(() => {
    ;(useNavigate as Mock).mockReturnValue(mockNavigate)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('logs in successfully with correct credentials', () => {
    const { result } = renderHook(() => useLogin())

    result.current.onSubmit({
      username: ACCOUNT_MOCK.username,
      password: ACCOUNT_MOCK.password
    })

    expect(setLocalStorage).toHaveBeenCalledWith(LOGIN_KEY, true)
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.BASE_ROUTE)
    expect(result.current.loginError).toBe(null)
  })

  test('sets error message for incorrect credentials', async () => {
    const { result } = renderHook(() => useLogin())

    result.current.onSubmit({
      username: 'wrong_username',
      password: 'wrong_password'
    })

    await waitFor(() =>
      expect(result.current.loginError).toBe(
        'Username or password are inccorect, please try again!'
      )
    )
    expect(setLocalStorage).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
