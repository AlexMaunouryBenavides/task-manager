import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Input from "../components/Input";

describe("Input component", () => {
  it("should render the input", () => {
    // creer mon composant dans le dom virtuel
    // c'est la que j'utilise jsdom
    // je dis que je créé un element input avec ce placeholder
    render(<Input placeholder="toto" />);
    //screen regarde le html fait par jsdom
    // ensuite je parcours les element pour trouver celui
    // avec le placeholder "toto"
    const input = screen.getByPlaceholderText("toto");
    expect(input).toBeInTheDocument();
  });
});
