import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDialog from '../ConfirmDialog';

describe('ConfirmDialog Component', () => {
  const defaultProps = {
    isOpen: true,
    message: 'Are you sure?',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    render(<ConfirmDialog {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });

  it('renders the dialog with correct message when isOpen is true', () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('renders Yes and No buttons', () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('calls onConfirm when Yes button is clicked', () => {
    render(<ConfirmDialog {...defaultProps} />);
    fireEvent.click(screen.getByText('Yes'));
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when No button is clicked', () => {
    render(<ConfirmDialog {...defaultProps} />);
    fireEvent.click(screen.getByText('No'));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('applies correct styling classes', () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText('Are you sure?').parentElement).toHaveClass('bg-white', 'rounded-lg', 'p-6');
  });

  it('renders buttons with correct variants', () => {
    render(<ConfirmDialog {...defaultProps} />);
    const noButton = screen.getByText('No').closest('button');
    const yesButton = screen.getByText('Yes').closest('button');
    
    expect(noButton).toHaveClass('bg-white');
    expect(noButton).toHaveClass('text-gray-800');
    
    expect(yesButton).toHaveClass('bg-red-500');
    expect(yesButton).toHaveClass('text-white');
  });
});