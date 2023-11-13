import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

it("renders without crashing", function () {
    render(<TodoList />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it('adds a new todo when a task is submitted', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Enter a new task');
    const submitButton = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('New Task')).toBeInTheDocument();
});

it('removes a todo when the remove button is clicked', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Enter a new task');
    const submitButton = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'Task to Remove' } });
    fireEvent.click(submitButton);

    const removeButton = screen.getByText('X');
    fireEvent.click(removeButton);

    expect(screen.queryByText('Task to Remove')).not.toBeInTheDocument();
});