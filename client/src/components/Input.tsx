import type IInput from "../interfaces/IInput";

export default function Input({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: IInput) {
  return (
    <input
      className="bg-transparent placeholder:px-4 border shadow-lg border-cyan-800 text-cyan-800 h-12.5 rounded-sm px-4"
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
