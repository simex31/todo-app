import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
}

const UIButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'px-4 py-2 rounded-lg font-medium transition-all duration-200'
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-400 text-white hover:bg-green-600'
  }
  const disabledStyles = disabled ? 'cursor-not-allowed opacity-50' : ''

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        className,
        disabledStyles
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default UIButton
