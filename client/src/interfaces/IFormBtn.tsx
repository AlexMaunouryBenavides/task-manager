import type { ButtonHTMLAttributes, ReactNode } from "react";

export default interface IFormBtn {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
