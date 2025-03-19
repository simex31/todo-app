import { useEffect, useState } from 'react'
import { getRandomQuote } from '@/features/todo/api'

export const useFetchQuote = () => {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    setQuote('Loading random quote...')
    getRandomQuote()
      .then((res) => setQuote(`${res.quote} - ${res.author}`))
      .catch((_) => setQuote('There was an error fetching the quote.'))
  }, [])

  return { quote }
}
