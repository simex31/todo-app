import { QUOTES_API_URL } from '../../../constants'

type QuoteResponse = {
  quote: string
  author: string
}

export const getRandomQuote = async (): Promise<QuoteResponse> => {
  const data = await fetch(QUOTES_API_URL).then((res) => res.json())
  return data
}
