import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "./SearchForm";

it("matches snapshot", function () {
    const { asFragment } = render(<SearchForm />);
    expect(asFragment()).toMatchSnapshot();
});

it("updates input field on change", () => {
    const { getByPlaceholderText } = render(<SearchForm searchFor={() => { }} />);
    const input = getByPlaceholderText("Enter search term..");

    userEvent.type(input, "test");
    expect(input.value).toBe("test");
});

it("calls searchFor function on form submission", () => {
    const mockSearchFor = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SearchForm searchFor={mockSearchFor} />);

    const input = getByPlaceholderText("Enter search term..");
    const submitButton = getByText("Submit");

    userEvent.type(input, "test");
    fireEvent.click(submitButton);

    expect(mockSearchFor).toHaveBeenCalledWith("test");
});

it("clears input after form submission", () => {
    const { getByPlaceholderText, getByText } = render(<SearchForm searchFor={() => { }} />);
    const input = getByPlaceholderText("Enter search term..");
    const submitButton = getByText("Submit");

    userEvent.type(input, "test");
    fireEvent.click(submitButton);

    expect(input.value).toBe("");
});


