import { Routes, Route } from 'react-router-dom'
import NotFound from '@/components/NotFound'
import AuthGuard from '@/components/AuthGuard'
import TodoPage from './pages/TodoPage'
import LoginPage from './pages/LoginPage'
import { ROUTES } from '@/constants'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.BASE_ROUTE}
        element={
          <AuthGuard>
            <TodoPage />
          </AuthGuard>
        }
      />
      <Route path={ROUTES.LOGIN_ROUTE} element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
