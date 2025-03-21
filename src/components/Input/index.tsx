import clsx from 'clsx'

interface UIInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const UIInput: React.FC<UIInputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  const baseStyles =
    'px-3 py-2 border rounded-lg w-full transition-all duration-200'
  const errorStyles = 'border-red-500 focus:ring-red-300'
  const normalStyles =
    'border-gray-300 focus:ring-blue-300 focus:border-blue-500'

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={clsx(baseStyles, errorStyles, normalStyles)}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export default UIInput
