// src/routes.tsx
import { Routes, Route } from 'react-router-dom'
import NotFound from '../features/not-found'
import TodoList from '../features/todo'
import Login from '../features/login'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
