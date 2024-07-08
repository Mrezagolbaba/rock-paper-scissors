import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { login, logout } from 'services/auth';
import { getScoreboard } from 'services/playGame';
import { Options, emojis } from 'data';

jest.mock('./services/auth');
jest.mock('./services/playGame');

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
      value: {
        reload: jest.fn(),
      },
      writable: true,
    });
  });

  it('should render login and register buttons when user is not logged in', () => {
    render(<App />);
    
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('should render welcome message and logout button when user is logged in', async () => {
    localStorage.setItem('userId', 'testUserId');
    (getScoreboard as jest.Mock).mockResolvedValue({ scoreboard: [] });
    
    render(<App />);
    
    await waitFor(() => expect(screen.getByText('Welcome, User!')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('should open login modal when Login button is clicked', () => {
    render(<App />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should open register modal when Register button is clicked', () => {
    render(<App />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    
    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should log out and reload the page when Logout button is clicked', async () => {
    localStorage.setItem('userId', 'testUserId');
    (getScoreboard as jest.Mock).mockResolvedValue({ scoreboard: [] });
    
    render(<App />);
    
    await waitFor(() => expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument());
    
    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));
    
    expect(logout).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

  const createTextMatcher = (userMove: string, computerMove: string, result: string) => {
    return (_: string, element?: Element | null) => {
      const hasText = (node: Element) => node.textContent === `You ${Options[userMove]} Computer${Options[computerMove]} result ${emojis[result]}`;
      return element ? hasText(element) : false;
    };
  };

  it('should update scoreboard after a new result', async () => {
    localStorage.setItem('userId', 'testUserId');
    (getScoreboard as jest.Mock).mockResolvedValue({
      scoreboard: [
        { userMove: 'rock', computerMove: 'scissors', result: 'win' },
        { userMove: 'paper', computerMove: 'rock', result: 'win' },
      ],
    });
    
    render(<App />);
    
    await waitFor(() => expect(screen.getByText('Last 10 Results')).toBeInTheDocument());

    expect(screen.queryAllByText(createTextMatcher('rock', 'scissors', 'win')).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(createTextMatcher('paper', 'rock', 'win')).length).toBeGreaterThan(0);
  });
});
