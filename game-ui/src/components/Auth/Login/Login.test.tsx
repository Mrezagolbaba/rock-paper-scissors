import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom/extend-expect';
import Login from '.';
import axios from 'axios';

jest.mock('axios');

describe('Login Component', () => {
    const mockOnCancel = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render Login modal', () => {
        render(<Login open={true} onCancel={mockOnCancel} />);

        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('should call handleLogin when Login button is clicked', async () => {
        (axios.post as jest.Mock).mockResolvedValue({ data: { id: '12345' } });

        render(<Login open={true} onCancel={mockOnCancel} />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /login/i }));
        });

        await waitFor(() => expect(mockOnCancel).toHaveBeenCalled());

        expect(localStorage.getItem('userId')).toBe('12345');
    });

    it('should close modal on cancel', () => {
        render(<Login open={true} onCancel={mockOnCancel} />);

        fireEvent.click(screen.getByRole('button', { name: /close/i }));

        expect(mockOnCancel).toHaveBeenCalled();
    });
});
