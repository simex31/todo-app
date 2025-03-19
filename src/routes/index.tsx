// src/routes.tsx
import { Routes, Route } from 'react-router-dom'
import NotFound from '../features/not-found'
import TodoList from '../features/todo'
import Login from '../features/auth/Login'
import AuthGuard from '../components/AuthGuard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <TodoList />
          </AuthGuard>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
