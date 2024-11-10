import Image from "next/image";
import { useState } from "react";
import EyeIcon from "@/public/images/eye.svg";
import EyeSlashIcon from "@/public/images/eye-slash.svg";

export default function Input({
  label,
  error,
  className = "",
  icon,
  type = "text",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <div className="relative bg-[#21212114] rounded-tl-md rounded-tr-md">
        <div className="absolute left-10 top-2 text-xs text-gray-500">
          {label}
        </div>

        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image src={icon} alt="icon" width={20} height={20} />
          </div>
        )}

        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={`w-full px-10 pb-2 pt-7 rounded-tl-md rounded-tr-md focus:outline-none focus:ring-0
            ${error ? "border-red-500" : ""} ${className}`}
          style={{
            backgroundColor: "transparent",
            border: "none",
            borderBottom: "2px solid #535253",
            color: "black",
          }}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            style={{ padding: "4px", borderRadius: "4px" }}
          >
            <Image
              src={showPassword ? EyeSlashIcon : EyeIcon}
              alt={showPassword ? "Hide password" : "Show password"}
              width={22}
              height={15}
            />
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
