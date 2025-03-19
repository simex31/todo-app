import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { setLocalStorage } from '../../../utils'
import { LOGIN_KEY } from '../../../constants'
import UIButton from '@/components/Button'

type LoginInputs = {
  username: string
  password: string
}

const ACCOUNT_MOCK = {
  username: 'admin',
  password: 'admin123'
}

export default function Login() {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>()
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    if (
      data.username === ACCOUNT_MOCK.username &&
      data.password === ACCOUNT_MOCK.password
    ) {
      setLocalStorage(LOGIN_KEY, true)
      navigate('/')
    } else {
      setLoginError('Username or password are inccorect, please try again!')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              onFocus={() => setLoginError(null)}
              type="username"
              placeholder="Enter your username"
              {...register('username', {
                required: { value: true, message: 'Username is required.' }
              })}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="mt-1 text-left text-sm text-red-600">
                {errors.username?.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              onFocus={() => setLoginError(null)}
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: { value: true, message: 'Password is required.' }
              })}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-left text-sm text-red-600">
                {errors.password?.message}
              </p>
            )}
          </div>

          {loginError && (
            <p className="mt-2 text-left text-sm text-red-600">{loginError}</p>
          )}

          <UIButton
            data-testid="login-btn"
            type="submit"
            variant="primary"
            className="w-full"
          >
            Login
          </UIButton>
        </form>
      </div>
    </div>
  )
}
