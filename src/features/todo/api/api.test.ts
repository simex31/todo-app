import { describe, it, expect, vi, Mock } from 'vitest'
import { getRandomQuote } from './'

global.fetch = vi.fn()

describe('getRandomQuote', () => {
  const mock = fetch as Mock
  it('should return a quote and author', async () => {
    const mockQuoteResponse = {
      quote:
        'The only limit to our realization of tomorrow is our doubts of today.',
      author: 'Franklin D. Roosevelt'
    }

    mock.mockResolvedValueOnce({
      json: () => Promise.resolve(mockQuoteResponse)
    })

    const result = await getRandomQuote()

    expect(result).toEqual(mockQuoteResponse)
    expect(result.quote).toBe(
      'The only limit to our realization of tomorrow is our doubts of today.'
    )
    expect(result.author).toBe('Franklin D. Roosevelt')
  })

  it('should handle errors if fetch fails', async () => {
    mock.mockRejectedValueOnce(new Error('API Error'))

    await expect(getRandomQuote()).rejects.toThrow('API Error')
  })
})
