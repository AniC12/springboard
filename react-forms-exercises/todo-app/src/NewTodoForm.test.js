import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';
import '@testing-library/jest-dom';

it("renders without crashing", function () {
    render(<NewTodoForm />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<NewTodoForm />);
    expect(asFragment()).toMatchSnapshot();
});

it("runs the create function on form submit", function () {
    const createMock = jest.fn();
    render(<NewTodoForm addTodo={createMock} />);
    const createButton = screen.getByText("Add Todo");
    fireEvent.click(createButton);
    expect(createMock).toHaveBeenCalled();
});