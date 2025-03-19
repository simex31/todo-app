import { Link, useNavigate } from 'react-router-dom'
import { getLocalStorage, setLocalStorage } from '../../../utils'
import { LOGIN_KEY } from '../../../constants'

export default function Navbar() {
  const navigate = useNavigate()
  const loggedIn = getLocalStorage<boolean>(LOGIN_KEY)

  const authButtonHandler = () => {
    if (loggedIn) {
      setLocalStorage(LOGIN_KEY, false)
      navigate('login')
    }
  }

  return (
    <nav className="bg-blue-600 text-white shadow-md p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold">
          Todo List
        </Link>
        {loggedIn && (
          <button
            onClick={authButtonHandler}
            className="text-lg bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}
