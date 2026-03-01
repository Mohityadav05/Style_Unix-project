import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const trimmedQuery = query.trim().toLowerCase();
      if (trimmedQuery) {
        // Map common search terms to existing routes if needed, 
        // or just navigate to the query as before.
        navigate(`/${trimmedQuery}`);
      }
    }
  };

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <div className="logo" onClick={() => navigate('/')}></div>
          <span className="brand-name" onClick={() => navigate('/')}>Style Unix</span>
        </div>

        <div className="nav-center">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button className="search-btn" onClick={handleSearch}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="nav-right">
          <button className="nav-icon-btn" title="Home" onClick={() => navigate('/')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>

          <button className="nav-icon-btn" title="Cart" onClick={() => navigate('/Cart')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>

          {!isLoggedIn ? (
            <button className="auth-btn-modern" onClick={() => navigate('/login')}>Login</button>
          ) : (
            <button className="auth-btn-modern logout" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
