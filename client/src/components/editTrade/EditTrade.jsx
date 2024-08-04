import React, { useEffect, useState } from "react";
import { useEditForm } from "../../hooks/useEditForm";
import { useCreateTrade, useGetOneTrade } from "../../hooks/useTrades";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as tradesAPI from "../../api/trades-api";

const initialValues = {
  ticker: "",
  date: "",
  entryPrice: "",
  quantity: "",
  exitPrice: "",
  pl: "",
  img: "",
};

export default function EditTrade() {
  const { id } = useParams();
  const [trade, setTrade] = useGetOneTrade(id);

  // const [error, setError] = useState("");
  const navigate = useNavigate();
  // const createTrade = useCreateTrade();

  const { values, changeHandler, submitHandler } = useEditForm(
    Object.assign(initialValues, trade),
    async (values) => {
      const isConfirmed = confirm(
        `Are you sure you want to edit ${trade.ticker} trade`
      );

      if (isConfirmed) {
        const updatedTrade = await tradesAPI.updateTrade(id, values);
        navigate(`/trades/${id}`);
      }
    }
  );

  return (
    <div className="edit-trade-container">
      <h1>Edit Trade</h1>
      {/* {error && <p className="error-message">{error}</p>} */}
      <form onSubmit={submitHandler} className="edit-trade-form">
        <div className="form-group">
          <label htmlFor="tickerSymbol">Ticker Symbol:</label>
          <input
            type="text"
            id="tickerSymbol"
            name="ticker"
            value={values.ticker}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={values.date}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="entryPrice">Entry Price:</label>
          <input
            type="number"
            id="entryPrice"
            name="entryPrice"
            value={values.entryPrice}
            onChange={changeHandler}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={values.quantity}
            onChange={changeHandler}
            step="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exitPrice">Exit Price (Optional):</label>
          <input
            type="number"
            id="exitPrice"
            name="exitPrice"
            value={values.exitPrice}
            onChange={changeHandler}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pl">P/L (Optional):</label>
          <input
            type="number"
            id="pl"
            name="pl"
            value={values.pl}
            onChange={changeHandler}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image Link:</label>
          <input
            type="url"
            id="image"
            name="img"
            value={values.img}
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Edit Trade
        </button>
      </form>
    </div>
  );
}
