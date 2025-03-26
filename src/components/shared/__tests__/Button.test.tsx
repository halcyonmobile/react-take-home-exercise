import React from 'react';
import { render, screen } from '@testing-library/react';

import Button from '../Button';

describe('Button Component', () => {
  it('should apply default className values', () => {
    render(<Button data-testid='tested-component'>Button Text</Button>);

    const comp = screen.getByTestId('tested-component');

    expect(comp).toBeInTheDocument();
    expect(comp.className).toEqual('px-4 py-2 rounded');
  });

  it('should compose className with default values', () => {
    render(<Button className='text-red-500' data-testid='tested-component'>Button Text</Button>);

    const comp = screen.getByTestId('tested-component');

    expect(comp).toBeInTheDocument();
    expect(comp.className).toEqual('text-red-500 px-4 py-2 rounded');
  });
});
