import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item logo">
          <Link to="/" className="nav-link">
            TradeVault
          </Link>
        </li>
      </ul>
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/trades" className="nav-link">
            All Posted Trades
          </Link>
        </li>

        <>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
        </>

        <>
          <li className="nav-item">
            <Link to="/add-trade" className="nav-link">
              Add Trade
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </li>
        </>
      </ul>
    </nav>
  );
}
