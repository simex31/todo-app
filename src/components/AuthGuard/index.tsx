import React from 'react'
import { Navigate } from 'react-router-dom'
import { getLocalStorage } from '../../utils'
import { LOGIN_KEY } from '../../constants'

// Define the AuthGuard component
interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  // Check for loggedIn status from localStorage
  const loggedIn = getLocalStorage<boolean>(LOGIN_KEY)
  // If not logged in, redirect to login page
  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  // If logged in, render children
  return <>{children}</>
}
