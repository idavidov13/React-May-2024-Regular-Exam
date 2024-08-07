import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useGetAllTrades } from "../../hooks/useTrades";

export default function HomePage() {
  const { isAuthenticated, email } = useAuthContext();
  const [trades, setTrades] = useGetAllTrades();

  return (
    <div className="home-container">
      <section className="home-content">
        <div className="last-data home-section">
          {trades.length > 0 ? (
            trades
              .reverse()
              .slice(0, 3)
              .map((trade) => (
                <div key={trade._id} className="last-item">
                  <p>
                    <strong>Ticker:</strong> {trade.ticker}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(trade.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Entry Price:</strong> ${trade.entryPrice}
                  </p>
                  <div className="divider"></div>
                </div>
              ))
          ) : (
            <p>No trades available.</p>
          )}
          <Link to="/trades" className="all-trades-link">
            All Trades
          </Link>
        </div>
        <div>
          <div className="home-section">
            <header className="home-header">
              <h1>Welcome to TradeVault</h1>
              <p>
                Your one-stop solution for tracking and managing all your
                trades.
              </p>
            </header>
          </div>
          <div className="home-section">
            {isAuthenticated ? (
              <>
                <h2>Hello, {email}</h2>
                <p>Participate in our community by adding new trade</p>
                <div className="home-links">
                  <Link to="/add-trade" className="home-link">
                    Add Trade
                  </Link>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
