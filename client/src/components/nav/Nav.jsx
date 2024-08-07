import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useState, useEffect } from "react";
import { fetchMarketData } from "../../api/market-api";

export default function NavBar() {
  const { isAuthenticated } = useAuthContext();
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMarketData = async () => {
      try {
        const data = await fetchMarketData();
        setMarketData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getMarketData();
  }, []);

  const latestDate = marketData
    ? Object.keys(marketData["Time Series (Daily)"])[0]
    : "";
  const latestClose = marketData
    ? marketData["Time Series (Daily)"][latestDate]["4. close"]
    : "";

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item logo">
          <Link to="/" className="nav-link">
            <strong>TradeVault</strong>
          </Link>
        </li>
      </ul>
      <section className="market-data">
        <div>
          <h2>S&P 500</h2>
          <div className="divider"></div>
          {error && <p>Error fetching data: {error}</p>}
          {marketData ? (
            <div>
              <p>
                <strong>Latest Date:</strong>{" "}
                <span className="data">{latestDate}</span>
              </p>
              <div className="divider"></div>
              <p>
                <strong>Latest Close Price:</strong>{" "}
                <span className="data">${latestClose}</span>
              </p>
            </div>
          ) : (
            <p>Loading market data...</p>
          )}
        </div>
      </section>

      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/trades" className="nav-link">
            All Posted Trades
          </Link>
        </li>
        {isAuthenticated ? (
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
        ) : (
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
        )}
      </ul>
    </nav>
  );
}
