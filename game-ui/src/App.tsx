import React, { useEffect, useState } from 'react';
import Register from 'components/Auth/Register';
import Login from 'components/Auth/Login';
import Game from 'components/Game';
import Scoreboard from 'components/ScoreBoard';
import Header from 'components/Header';
import { logout } from 'services/auth';
import { getScoreboard } from 'services/playGame';
import { scoreboardProps } from 'types';
import Logo from 'assets/img.png'
import './App.css';



const App: React.FC = () => {
  const userId = localStorage.getItem('userId');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [scoreboard, setScoreboard] = useState<scoreboardProps[]>([]);

  useEffect(() => {
    if (userId) {
      getScoreboard(userId).then((res) => {
       if(res.scoreboard.length > 0) setScoreboard(res?.scoreboard);
      });
    }

  }, [userId]);

  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
    setShowLogin(false);
    setShowRegister(false);
    window.location.reload();
  };

  const handleNewResult = () => {
    getScoreboard(userId as string).then((res) => {
      // set last 10 results
      setScoreboard(res.scoreboard.slice(0, 10).map((item:scoreboardProps) => item));
    });
   
  };
  return (
    <div className="app-container">
      <Header
        isLoggedIn={!!userId}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />
      {!userId ? (
        <div className="auth-forms">
          <p className='title-auth'>Rock , Paper , Scissors Game</p>
          <img src={Logo} alt="icon" width={300} height={300} />
        </div>
      ) : (
        <div className="game-container">
          <Game userId={userId} onNewResult={handleNewResult} />
          {scoreboard?.length > 0 && <Scoreboard  results={scoreboard} />}
        </div>
      )}
      <Register
        open={showRegister}
        onCancel={() => setShowRegister(false)}
      />
      <Login
        open={showLogin}
        onCancel={() => setShowLogin(false)}
      />
    </div>
  );
};

export default App;
