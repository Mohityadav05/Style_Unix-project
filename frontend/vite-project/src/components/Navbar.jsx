import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (query.trim()) {
        navigate(`/${query}`);
      }
    }
  };

  const isLoggedIn = !!localStorage.getItem("token");

  const handlelogin = () => {
    navigate('/login');
  }

  const handlehome = () => {
    navigate('/');
  }

  const handleCart = () => {
    navigate('/Cart');
  }

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate('/login');
    window.location.reload(); // Force refresh to update UI state
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo"></div>
        <button className="cart" onClick={handlehome}><div className="homebutton"></div></button>
        <input type="text" className="search-bar" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearch} />
        <button className="cart" onClick={handleCart}><div className="cart-icon  "></div></button>

        {!isLoggedIn ? (
          <button className="auth-button" onClick={handlelogin}>Login</button>
        ) : (
          <button className="auth-button" onClick={handlelogout}>Logout</button>
        )}
      </nav>
    </>
  );
}

export default Navbar;
