// BoxList.test.js
import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import BoxList from './BoxList';

it("renders without crashing", function () {
    render(<BoxList />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

// Adding a Box Test
it('can add a new box', () => {
    render(<BoxList />);

    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText(/width/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/height/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/backgroundColor/i), { target: { value: 'red' } });
    fireEvent.click(screen.getByText(/Add a new box/i));

    // Check for the box in the document
    const box = screen.getByTestId('box'); // Assuming each Box component has a data-testid="box"
    const removeButton = within(box).getByText(/X/i);

    expect(removeButton).toBeInTheDocument();
});

// Removing a Box Test
it('can remove a box', () => {
    render(<BoxList />);

    // Add a box first
    fireEvent.change(screen.getByLabelText(/width/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/height/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/backgroundColor/i), { target: { value: 'red' } });
    fireEvent.click(screen.getByText(/Add a new box/i));

    // Find the box and its remove button
    const box = screen.getByTestId('box'); // Assuming each Box component has a data-testid="box"
    const removeButton = within(box).getByText(/X/i);

    // Remove the box
    fireEvent.click(removeButton);

    // Check if the box was removed
    expect(screen.queryByTestId('box')).not.toBeInTheDocument();
});