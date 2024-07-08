import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Scoreboard from '.';
import { emojis, Options } from 'data';

describe('Scoreboard Component', () => {
  const mockResults = [
    { userMove: 'rock', computerMove: 'scissors', result: 'win' },
    { userMove: 'paper', computerMove: 'rock', result: 'win' },
    { userMove: 'scissors', computerMove: 'rock', result: 'lose' },
    { userMove: 'rock', computerMove: 'rock', result: 'draw' },
  ];

  const createTextMatcher = (userMove: string, computerMove: string, result: string) => {
    return (_: string, element: Element | null) => {
      const hasText = (node: Element) => node.textContent === `You ${Options[userMove]} Computer${Options[computerMove]} result ${emojis[result]}`;
      return element ? hasText(element) : false;
    };
  };

  it('should render last 10 results', () => {
    render(<Scoreboard results={mockResults} />);

    expect(screen.getByText('Last 10 Results')).toBeInTheDocument();

    mockResults.forEach((result) => {
      const elements = screen.queryAllByText(createTextMatcher(result.userMove, result.computerMove, result.result));
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('should apply correct CSS classes based on result', () => {
    render(<Scoreboard results={mockResults} />);

    mockResults.forEach((result) => {
      const elements = screen.queryAllByText(createTextMatcher(result.userMove, result.computerMove, result.result));
      const listItem = elements[0]?.closest('li');
      expect(listItem).toHaveClass(result.result);
    });
  });
});
