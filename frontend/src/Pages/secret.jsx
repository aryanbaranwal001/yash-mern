import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="welcome-card">
          <h1 className="welcome-title">
            Welcome to the Restaurant Booking Platform <span className="emoji">🍽️</span>
          </h1>
          <p className="welcome-text">
            Discover and reserve tables at the finest restaurants in town
          </p>
          <div className="action-buttons">
            <Link to="/register" className="register-button">
              Register
            </Link>
            <Link to="/login" className="login-button">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

