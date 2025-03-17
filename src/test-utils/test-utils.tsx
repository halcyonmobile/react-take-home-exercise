import type { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function render(ui: ReactElement, { ...renderOptions } = {}) {
  const returnValue = {
    ...rtlRender(ui, { ...renderOptions }),
    user: userEvent.setup(),
  };

  return returnValue;
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };