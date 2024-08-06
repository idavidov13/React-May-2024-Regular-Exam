import React from "react";
import TradeItem from "./tradeItem/TradeItem";
import { useGetAllTrades } from "../../hooks/useTrades";

const AllTrades = () => {
  const [trades, setTrades] = useGetAllTrades();
  return (
    <div>
      <h1 className="all-trades-heading">All Posted Trades</h1>

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
    </div>
  );
};

export default AllTrades;
