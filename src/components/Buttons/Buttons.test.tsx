import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Button from "./Button"

describe('Filter Test', () => {

  it("Matches DOM Snapshot", () => {
    const filterMock = jest.fn()
    const { container } = render(<Button currentFilter={'all'} filter={'All'} title={'Placeholder'} setFilter={filterMock} />);
    expect(container).toMatchSnapshot();
  });

  it("Clicking Button should call mock", () => {
    const filterMock = jest.fn()
    render(<Button currentFilter={'all'} filter={'All'} title={'Placeholder'} setFilter={filterMock} />);
    const element = screen.queryByText('Placeholder')
    element?.click();
    expect(filterMock).toHaveBeenCalledTimes(1)
  });


});