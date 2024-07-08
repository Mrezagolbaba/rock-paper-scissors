import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from '.';
import { GamePlay } from 'services/playGame';
import { emojis, Items } from 'data';

jest.mock('services/playGame');

describe('Game Component', () => {
  const mockOnNewResult = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Game component', () => {
    render(<Game userId="testUserId" onNewResult={mockOnNewResult} />);

    expect(screen.getByText('Make Your Move')).toBeInTheDocument();
    Items.forEach(item => {
      expect(screen.getByText(item.value)).toBeInTheDocument();
    });
  });

  it('should display result after making a move', async () => {
    (GamePlay as jest.Mock).mockResolvedValue({
      computerMove: 'rock',
      result: 'win'
    });

    render(<Game userId="testUserId" onNewResult={mockOnNewResult} />);

    fireEvent.click(screen.getByText(Items[0].value)); // Simulate clicking the first choice button

    await waitFor(() => expect(screen.getByText(/You chose/i)).toBeInTheDocument());

    expect(screen.getByText(/You chose rock. Computer chose rock. You win!/i)).toBeInTheDocument();
    expect(mockOnNewResult).toHaveBeenCalled();

    const winEmojis = await screen.findAllByText(emojis['win']);
    expect(winEmojis).toHaveLength(5); // Adjust this number based on how many emojis you expect
  });

  it('should display confetti and emoji rain on win', async () => {
    (GamePlay as jest.Mock).mockResolvedValue({
      computerMove: 'scissors',
      result: 'win'
    });

    render(<Game userId="testUserId" onNewResult={mockOnNewResult} />);

    fireEvent.click(screen.getByText(Items[0].value)); // Simulate clicking the first choice button

    await waitFor(() => expect(screen.getByText(/You chose rock. Computer chose scissors. You win!/i)).toBeInTheDocument());

    // Ensure Confetti component has a data-testid
    expect(screen.getByTestId('confetti')).toBeInTheDocument();

    const winEmojis = await screen.findAllByText(emojis['win']);
    expect(winEmojis).toHaveLength(5); // Adjust this number based on how many emojis you expect
  });
});
