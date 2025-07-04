import { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-gy4y.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      if (data.message === 'Login successful') {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login successful");
        navigate('/');
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="Login-Container">
      <form className="login-form" onSubmit={handlesubmit}>
        <h1 className="login-font">Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value={"Login"} className="login-button" />
        <br />
        <p className="login-font1">Don't have an account?</p>
        <a href="/signup">Sign Up</a>
      </form>
    </div>
  );
}

export default Login;
