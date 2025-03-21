import { renderHook, waitFor } from '@testing-library/react'
import { useFetchQuote } from '@/hooks'
import { getRandomQuote } from '@/features/todo/api'
import { Mock, vi } from 'vitest'

vi.mock('@/features/todo/api', () => ({
  getRandomQuote: vi.fn()
}))

describe('useFetchQuote', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('check if Loading text is shown', async () => {
    ;(getRandomQuote as Mock).mockResolvedValueOnce({
      quote: 'Some randome quote for unit tests',
      author: 'Unknown'
    })

    const { result } = renderHook(() => useFetchQuote())

    expect(result.current.quote).toBe('Loading random quote...')
  })

  test('fetches and sets the quote on success', async () => {
    ;(getRandomQuote as Mock).mockResolvedValueOnce({
      quote: 'Some randome quote for unit tests',
      author: 'Unknown'
    })

    const { result } = renderHook(() => useFetchQuote())

    await waitFor(() => {
      expect(result.current.quote).toBe(
        'Some randome quote for unit tests - Unknown'
      )
    })
  })

  test('sets error message on fetch failure', async () => {
    ;(getRandomQuote as Mock).mockRejectedValueOnce(
      new Error('Failed to fetch')
    )

    const { result } = renderHook(() => useFetchQuote())

    await waitFor(() => {
      expect(result.current.quote).toBe(
        'There was an error fetching the quote.'
      )
    })
  })
})
