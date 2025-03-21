import { ACCOUNT_MOCK, LOGIN_KEY, ROUTES } from '@/constants'
import { setLocalStorage } from '@/utils'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { LoginInputs } from '../types'

export const useLogin = () => {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    if (
      data.username === ACCOUNT_MOCK.username &&
      data.password === ACCOUNT_MOCK.password
    ) {
      setLocalStorage(LOGIN_KEY, true)
      navigate(ROUTES.BASE_ROUTE)
    } else {
      setLoginError('Username or password are inccorect, please try again!')
    }
  }
  return { setLoginError, loginError, onSubmit }
}
