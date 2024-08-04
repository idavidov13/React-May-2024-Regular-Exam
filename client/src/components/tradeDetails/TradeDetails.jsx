import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import * as tradesAPI from "../../api/trades-api";

import { useParams } from "react-router-dom";
import { useGetOneTrade } from "../../hooks/useTrades";

const TradeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, email } = useAuthContext();
  // const { email, userId } = useAuthContext();

  const [trade, setTrade] = useGetOneTrade(id);

  // const isOwner = userId === trade._ownerId;

  const tradeDeleteHandler = async () => {
    const isConfirmed = confirm(
      `Are you sure you want to delete ${trade.ticker} trade`
    );

    if (isConfirmed) {
      try {
        await tradesAPI.deleteTrade(id);

        navigate("/trades");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

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
          {isAuthenticated ? (
            <div className="details-links">
              <Link
                to="#"
                onClick={tradeDeleteHandler}
                className="details-link "
              >
                Delete
              </Link>
              <Link
                to={`/trades/${id}/edit`}
                className="details-link edit-link"
              >
                Edit
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeDetails;
