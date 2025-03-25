import React from 'react';
import { render, screen } from '@testing-library/react';

import TaskItem from '../TaskItem';

describe('TaskItem Component', () => {
    it('should render with default values', async () => {
        const mockDeleteFn = vi.fn();
        const mockToggleFn = vi.fn();

        const task = { id: 1, title: 'Test', completed: false };

        render(<TaskItem task={task} onDelete={mockDeleteFn} onToggle={mockToggleFn} />);

        const comp = screen.getByRole('taskItem');

        expect(comp).toBeInTheDocument();

        const title = screen.getByText(task.title)
        expect(title).toBeInTheDocument()
        
        await title.click()

        expect(mockToggleFn).toHaveBeenCalled();

        const deleteButton = screen.getByRole('taskItem:delete');
        expect(deleteButton).toBeInTheDocument()

        await deleteButton.click();

        const deleteModal = screen.getByRole('modalPanel');
        expect(deleteModal).toBeInTheDocument();

        const modalDeleteButton = screen.getByText('DELETE');
        expect(modalDeleteButton).toBeInTheDocument();

        await modalDeleteButton.click();

        expect(mockDeleteFn).toHaveBeenCalled();
        expect(screen.queryByRole('modalPanel')).not.toBeInTheDocument();
    });
});
