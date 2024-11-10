export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`w-[140px] h-[40px] text-[16px] bg-[#C9B500] text-white rounded-full hover:bg-[#A8A100] 
        transition-colors duration-200 disabled:bg-[#D0D000] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
