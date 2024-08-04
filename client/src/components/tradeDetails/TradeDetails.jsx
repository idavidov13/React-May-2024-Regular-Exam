import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOneTrade } from "../../hooks/useTrades";

const TradeDetails = () => {
  const { id } = useParams();
  const [trade, setTrade] = useGetOneTrade(id);

  if (!trade) {
    return <p>Loading trade details...</p>;
  }

  return (
    <div className="trade-details">
      <h1>{trade.ticker}</h1>
      <div className="trade-details-container">
        <img
          src={trade.img}
          alt={trade.ticker}
          className="trade-details-image"
        />
        <div className="trade-info">
          <p>
            <strong>Date:</strong> {trade.date}
          </p>
          <p>
            <strong>Entry Price:</strong> ${trade.entryPrice}
          </p>
          <p>
            <strong>Quantity:</strong> {trade.quantity}
          </p>
          <p>
            <strong>Exit Price:</strong>{" "}
            {trade.exitPrice ? `$${trade.exitPrice}` : "Not Closed Yet"}
          </p>
          <p>
            <strong>P/L:</strong> {trade["p/l"] ? trade["p/l"] : "TBD"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradeDetails;
