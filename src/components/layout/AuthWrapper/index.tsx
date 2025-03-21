type Props = {
  children: React.ReactNode
}

const AuthWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  )
}

export default AuthWrapper
