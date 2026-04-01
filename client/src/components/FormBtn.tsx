import type IFormBtn from "../interfaces/IFormBtn";

export default function FormBtn({
  children,
  type = "submit",
  onClick,
  className = "",
}: IFormBtn) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-cyan-800 rounded-sm h-12.5 text-blue-50 cursor-pointer shadow-lg px-4 ${className}`}
    >
      {children}
    </button>
  );
}
