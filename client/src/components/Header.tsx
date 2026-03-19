import type IHeader from "../interfaces/IHeader";

export default function Header({ title }: IHeader) {
  return (
    <header className="bg-cyan-800 text-blue-50 font-tm-title text-center text-[64px] py-2 shadow-xl ">
      {title}
    </header>
  );
}
