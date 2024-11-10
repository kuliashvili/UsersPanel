export default function Button({ children, className = '', ...props }) {
    return (
      <button
        className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
          transition-colors duration-200 disabled:bg-blue-300 ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }