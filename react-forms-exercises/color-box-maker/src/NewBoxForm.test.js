import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';

it('renders without crashing', function () {
    render(<NewBoxForm />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<NewBoxForm />);
    expect(asFragment()).toMatchSnapshot();
});

// Mock function for addBox
const mockAddBox = jest.fn();

it('submits form data correctly', () => {
    render(<NewBoxForm addBox={mockAddBox} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/width/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/height/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/backgroundColor/i), { target: { value: 'blue' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Add a new box/i));

    // Check if addBox was called with the right data
    expect(mockAddBox).toHaveBeenCalledWith({
        width: '100',
        height: '100',
        backgroundColor: 'blue',
        id: expect.any(String) // Since uuid generates a unique string, we expect any string here
    });
});