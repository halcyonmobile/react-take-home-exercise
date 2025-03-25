import React from 'react';
import { render, screen } from '@testing-library/react';

import Modal from '../Modal';

describe('Modal Component', () => {
    it('should return null for isOpen is false', () => {
        render(<Modal isOpen={false}>Modal</Modal>);

        const bgDiv = screen.queryByRole('modalBackgrond');

        expect(bgDiv).not.toBeInTheDocument();
    });

    it('should render with default values', () => {
        render(<Modal isOpen={true}>Modal Content</Modal>);

        const bgDiv = screen.getByRole('modalBackgrond');
        const sizeDiv = screen.getByRole('modalSizePanel');
        const mainDiv = screen.getByRole('modalPanel');

        expect(screen.getByText('Modal Content')).toBeInTheDocument()

        expect(bgDiv).toBeInTheDocument();
        expect(bgDiv.className).toEqual('fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center');
        
        expect(sizeDiv).toBeInTheDocument();
        expect(sizeDiv.className).toEqual('md:w-3/6 sm:w-5/6');
        
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv.className).toEqual('bg-white p-2 rounded');
    });
});
