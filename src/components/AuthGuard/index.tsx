import React from 'react'
import { Navigate } from 'react-router-dom'
import { getLocalStorage } from '@/utils'
import { LOGIN_KEY, ROUTES } from '@/constants'

type Props = {
  children: React.ReactNode
}

const AuthGuard = ({ children }: Props) => {
  const loggedIn = getLocalStorage<boolean>(LOGIN_KEY)
  if (!loggedIn) {
    return <Navigate to={ROUTES.LOGIN_ROUTE} replace />
  }
  return <>{children}</>
}

export default AuthGuard
