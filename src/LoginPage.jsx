import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple check, you can replace this with real auth
    if (username && password) {
      navigate('/gallery');
    } else {
      alert('Enter both username and password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="border p-4 rounded" onSubmit={handleLogin} style={{ minWidth: '300px' }}>
        <h4 className="text-center mb-3">Login</h4>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Username"
            value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

