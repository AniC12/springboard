import React from 'react';
import { render } from '@testing-library/react';
import Box from './Box';

it('renders without crashing', function () {
  render(<Box 
    id="test-id" 
    width="100" 
    height="100" 
    backgroundColor="red" 
    removeBox={() => {}} />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<Box 
        id="test-id" 
        width="100" 
        height="100" 
        backgroundColor="red" 
        removeBox={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
});