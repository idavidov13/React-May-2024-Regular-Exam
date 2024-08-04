import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

export default function HomePage() {
  const { isAuthenticated, email } = useAuthContext();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to TradeVault</h1>
        <p>Your one-stop solution for tracking and managing all your trades.</p>
      </header>
      <section className="home-content">
        {isAuthenticated ? (
          <div className="home-section">
            <h2>Hello, {email}</h2>
            <p>Participate in our community by adding new trade</p>
            <div className="home-links">
              <Link to="/add-trade" className="home-link">
                Add Trade
              </Link>
            </div>
          </div>
        ) : (
          <div className="home-section">
            <h2>Get Started</h2>
            <p>Join us today and start tracking your trades with ease.</p>
            <div className="home-links">
              <Link to="/login" className="home-link">
                Login
              </Link>
              <Link to="/register" className="home-link register-link">
                Register
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
