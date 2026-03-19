import type { ChangeEventHandler } from "react";

export default interface IInput {
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
