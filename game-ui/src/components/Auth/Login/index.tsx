import React, { useState } from 'react';
import { Modal } from 'antd';
import { login } from 'services/auth';
import 'components/Auth/Auth.css';


interface LoginProps {
  onCancel: () => void;
  open: boolean;
}

const Login: React.FC<LoginProps> = ({ open, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login(username, password)
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={() => onCancel()}
      footer={null}
      wrapClassName='auth-modal'
    >
      <div className="auth-container">
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="auth-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="auth-input"
        />
        <button onClick={handleLogin} className="auth-button">Login</button>
      </div>
    </Modal>
  );
};

export default Login;
