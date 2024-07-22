import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to TradeVault</h1>
        <p>Your one-stop solution for tracking and managing all your trades.</p>
      </header>
      <section className="home-content">
        <div className="home-section">
          <h2>Get Started</h2>
          <p>Join us today and start tracking your trades with ease.</p>
          <div className="home-links">
            <Link to="/register" className="home-link">
              Register
            </Link>
            <Link to="/login" className="home-link">
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
