import React from 'react';
import './styles.css';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogin, onRegister, onLogout }) => {
  return (
    <div className="header">
      {isLoggedIn ? (
        <div>
          <span>Welcome, User!</span>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={onLogin} className="header-button">Login</button>
          <button onClick={onRegister} className="header-button">Register</button>
        </div>
      )}
    </div>
  );
};

export default Header;
