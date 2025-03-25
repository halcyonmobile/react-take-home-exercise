import React, { act } from "react";
import { render, screen } from "@testing-library/react";

import TaskItem from "../TaskItem";

describe("TaskItem Component", () => {
  describe('with pending task', () => {    
    const task = { id: 1, title: "Pending Task", completed: false };

    const mockDeleteFn = vi.fn();
    const mockToggleFn = vi.fn();

    it('should apply style for pending task', () => {
      render(
        <TaskItem task={task} onDelete={mockDeleteFn} onToggle={mockToggleFn} />
      );
  
      const comp = screen.getByRole("taskItem");
  
      expect(comp).toBeInTheDocument();
  
      const title = screen.getByText(task.title);
      expect(title).toBeInTheDocument();
      expect(title.className).toEqual('cursor-pointer pr-1 text-black');
    })

    it("calls onToggle callback when click on task title", async () => {    
      render(
        <TaskItem task={task} onDelete={mockDeleteFn} onToggle={mockToggleFn} />
      );
  
      const title = screen.getByText(task.title);
  
      title.click();
  
      expect(mockToggleFn).toHaveBeenCalled();
    });

    it("calls onDelete callback after click on delete button in confirmation modal", async () => {    
      render(
        <TaskItem task={task} onDelete={mockDeleteFn} onToggle={mockToggleFn} />
      );
    
      const deleteButton = screen.getByRole("taskItem:delete");
      expect(deleteButton).toBeInTheDocument();
  
      await act(() => {
        deleteButton.click();
      });
  
      const deleteModal = screen.getByRole("modalPanel");
      expect(deleteModal).toBeInTheDocument();
  
      const modalDeleteButton = screen.getByText("DELETE");
      expect(modalDeleteButton).toBeInTheDocument();
  
      await act(async () => {
        modalDeleteButton.click();
      });
  
      expect(deleteModal).not.toBeInTheDocument();
  
      expect(mockDeleteFn).toHaveBeenCalled();
    });
  })

  describe('with completed task', () => {    
    it("should apply style for completed task", async () => {
      const task = { id: 1, title: "Completed Task", completed: true };
  
      const mockDeleteFn = vi.fn();
      const mockToggleFn = vi.fn();
  
      render(
        <TaskItem task={task} onDelete={mockDeleteFn} onToggle={mockToggleFn} />
      );
  
      const comp = screen.getByRole("taskItem");
  
      expect(comp).toBeInTheDocument();
  
      const title = screen.getByText(task.title);
      expect(title).toBeInTheDocument();
      expect(title.className).toEqual('cursor-pointer pr-1 line-through text-green-500');
    });
  })
});
