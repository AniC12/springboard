import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Todo from "./Todo";

it("renders without crashing", function () {
    render(<Todo />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<Todo />);
    expect(asFragment()).toMatchSnapshot();
});

const task = 'Test Task';
const id = 1;
const mockRemoveTodo = jest.fn();

it('renders with the correct task', () => {
    render(<Todo id={id} task={task} removeTodo={mockRemoveTodo} />);
    expect(screen.getByText(task)).toBeInTheDocument();
});

it('calls removeTodo with the right id when "X" button is clicked', () => {
    render(<Todo id={id} task={task} removeTodo={mockRemoveTodo} />);
    const button = screen.getByRole('button', { name: 'X' });
    fireEvent.click(button);
    expect(mockRemoveTodo).toHaveBeenCalledWith(id);
});