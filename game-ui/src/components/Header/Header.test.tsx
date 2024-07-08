import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '.';

describe('Header Component', () => {
  const mockOnLogin = jest.fn();
  const mockOnRegister = jest.fn();
  const mockOnLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Login and Register buttons when not logged in', () => {
    render(
      <Header 
        isLoggedIn={false} 
        onLogin={mockOnLogin} 
        onRegister={mockOnRegister} 
        onLogout={mockOnLogout} 
      />
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.queryByText('Welcome, User!')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should render Welcome message and Logout button when logged in', () => {
    render(
      <Header 
        isLoggedIn={true} 
        onLogin={mockOnLogin} 
        onRegister={mockOnRegister} 
        onLogout={mockOnLogout} 
      />
    );

    expect(screen.getByText('Welcome, User!')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
  });

  it('should call onLogin when Login button is clicked', () => {
    render(
      <Header 
        isLoggedIn={false} 
        onLogin={mockOnLogin} 
        onRegister={mockOnRegister} 
        onLogout={mockOnLogout} 
      />
    );

    fireEvent.click(screen.getByText('Login'));
    expect(mockOnLogin).toHaveBeenCalled();
  });

  it('should call onRegister when Register button is clicked', () => {
    render(
      <Header 
        isLoggedIn={false} 
        onLogin={mockOnLogin} 
        onRegister={mockOnRegister} 
        onLogout={mockOnLogout} 
      />
    );

    fireEvent.click(screen.getByText('Register'));
    expect(mockOnRegister).toHaveBeenCalled();
  });

  it('should call onLogout when Logout button is clicked', () => {
    render(
      <Header 
        isLoggedIn={true} 
        onLogin={mockOnLogin} 
        onRegister={mockOnRegister} 
        onLogout={mockOnLogout} 
      />
    );

    fireEvent.click(screen.getByText('Logout'));
    expect(mockOnLogout).toHaveBeenCalled();
  });
});
