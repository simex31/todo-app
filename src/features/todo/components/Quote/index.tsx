import { useFetchQuote } from '@/hooks'

const Quote = () => {
  const { quote } = useFetchQuote()

  return (
    <p className="mb-4">
      <i>{quote}</i>
    </p>
  )
}

export default Quote
