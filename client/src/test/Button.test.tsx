import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FormBtn from "../components/FormBtn";

describe("testing the button", () => {
  it("should display texte passed as children", () => {
    render(<FormBtn>Login</FormBtn>);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
