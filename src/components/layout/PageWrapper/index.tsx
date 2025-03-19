interface Props {
  children: React.ReactNode
}

const PageWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-2">
      {children}
    </div>
  )
}

export default PageWrapper
