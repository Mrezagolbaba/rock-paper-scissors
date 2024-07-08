import React, { useState } from 'react';
import { Modal } from 'antd';
import { register } from 'services/auth';
import 'components/Auth/Auth.css';

interface RegisterProps {
  open: boolean;
  onCancel: () => void;
}

const Register: React.FC<RegisterProps> = ({
  open,
  onCancel,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await register(username, password).then((res) => {
      localStorage.setItem('userId', res.id);
    });
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={() => onCancel()}
      footer={null}
    >
      <div className="auth-container">
        <h2>Register</h2>
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
        <button onClick={handleRegister} className="auth-button">Register</button>
      </div>
    </Modal>
  );
};

export default Register;
