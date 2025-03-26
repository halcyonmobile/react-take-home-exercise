import React from "react";
import { render, screen } from "@testing-library/react";

import FilterButton from "../FilterButton";

describe("FilterButton Component", () => {
  describe('filter key to the same current filter', () => {    
    it("should render with default values", () => {
      render(
        <FilterButton
          filterKey="all"
          currentFilter="all"
          data-testid="tested-component"
          className="sd:w-20"
        />
      );
  
      const comp = screen.getByTestId("tested-component");
  
      expect(comp).toBeInTheDocument();
      expect(comp.className).toEqual('px-5 py-2 rounded capitalize bg-blue-500 text-white sd:w-20');
      expect(comp.textContent).toEqual('all');
    });
  });

  describe('filter key to the other current filter', () => {    
    it("should render with default values", () => {
      const mockSetFilter = vi.fn();
  
      render(
        <FilterButton
          filterKey="pending"
          onClick={mockSetFilter}
          currentFilter="all"
          data-testid="tested-component"
          name="pendingButton"
        />
      );
  
      const comp = screen.getByTestId("tested-component");
  
      expect(comp).toBeInTheDocument();
      expect(comp.className).toEqual('px-5 py-2 rounded capitalize text-gray-700');
      expect(comp.textContent).toEqual('pending');
      expect(comp.getAttribute('name')).toEqual('pendingButton');
    });
  });
});
