import React from 'react'
import { Navigate } from 'react-router-dom'
import { getLocalStorage } from '../../utils'
import { LOGIN_KEY } from '../../constants'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const loggedIn = getLocalStorage<boolean>(LOGIN_KEY)
  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
