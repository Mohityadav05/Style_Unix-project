import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-gy4y.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, username, phone }),
      });

      const data = await response.json();
      alert(data.message);
      if (data.message === 'Signup successful') {
        localStorage.setItem("isSignup", "true");
        navigate('/login'); 
      }
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="Signup-container">
      <form className="Signup-form" onSubmit={handleSignup}>
        <h1 className="Signup-font">Sign Up</h1>

        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter your phone number"
          name="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Sign Up" className="Signup-button" />
      </form>
    </div>
  );
}

export default Signup;
