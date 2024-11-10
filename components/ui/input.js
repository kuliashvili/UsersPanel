export default function Input({ label, error, className = '', ...props }) {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }