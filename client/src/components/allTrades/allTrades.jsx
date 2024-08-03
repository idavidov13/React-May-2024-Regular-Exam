import React from "react";
import { useEffect, useState } from "react";
import * as tradesAPI from "../../api/trades-api";
import TradeItem from "./tradeItem/TradeItem";

const AllTrades = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    tradesAPI
      .getAll()
      .then((result) => {
        setTrades(result);
      })
      .catch((error) => console.error("Error fetching trades:", error));
  }, []);

  return (
    <div className="all-posted-trades">
      {trades.length > 0 ? (
        trades.map((trade) => <TradeItem key={trade._id} {...trade} />)
      ) : (
        <div className="no-trades-container">
          <h3>There are no logged trades yet!</h3>
          <p>Be the first and go get it!</p>
        </div>
      )}
    </div>
  );
};

export default AllTrades;
