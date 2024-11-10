import Image from "next/image";

export default function Input({
  label,
  error,
  className = "",
  icon,
  ...props
}) {
  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image src={icon} alt="icon" width={17} height={17} />
          </div>
        )}
        <input
          className={`w-full px-10 py-2 rounded-tl-md rounded-tr-md focus:outline-none focus:ring-0
            ${error ? "border-red-500" : ""} ${className}`}
          style={{
            backgroundColor: "#21212114", // 8% opacity background color
            border: "none", // Remove all borders
            borderBottom: "2px solid #535253", // Bottom border
            color: "black", // Input text color
          }}
          placeholder="Enter value"
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
