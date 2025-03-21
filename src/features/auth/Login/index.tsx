import UIInput from '@/components/Input'
import { LoginInputs } from '../types'
import { useLogin } from '../hooks'
import { useForm } from 'react-hook-form'
import UIButton from '@/components/Button'

const Login = () => {
  const { loginError, setLoginError, onSubmit } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>()

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <UIInput
            id="username"
            type="username"
            label="Username"
            error={errors.username?.message}
            onFocus={() => setLoginError(null)}
            placeholder="Enter your username"
            {...register('username', {
              required: { value: true, message: 'Username is required.' }
            })}
          />
          <UIInput
            id="password"
            onFocus={() => setLoginError(null)}
            type="password"
            label="Password"
            error={errors.password?.message}
            placeholder="Enter your password"
            {...register('password', {
              required: { value: true, message: 'Password is required.' }
            })}
          />
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

export default Login
