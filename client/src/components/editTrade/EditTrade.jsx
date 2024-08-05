import { useState } from "react";
import { useEditForm } from "../../hooks/useEditForm";
import { useGetOneTrade } from "../../hooks/useTrades";
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

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { values, changeHandler, submitHandler } = useEditForm(
    Object.assign(initialValues, trade),
    async (values) => {
      setError("");

      if (!values.ticker.trim()) {
        return setError("Ticker symbol is required.");
      }
      if (!values.date) {
        return setError("Date is required.");
      }
      const currentDate = new Date().toISOString().split("T")[0];
      if (values.date > currentDate) {
        return setError("The date cannot be in the future.");
      }
      if (values.entryPrice <= 0) {
        return setError("Entry price must be a positive number.");
      }
      if (values.quantity <= 0 || !Number.isInteger(Number(values.quantity))) {
        return setError("Quantity must be a positive integer.");
      }
      if (values.exitPrice && values.exitPrice < 0) {
        return setError("Exit price must be a positive number or left empty.");
      }
      if (values.pl && isNaN(Number(values.pl))) {
        return setError("P/L must be a number.");
      }
      if (!/^https?:\/\/.+\..+/.test(values.img)) {
        return setError("Please enter a valid URL for the image link.");
      }

      const isConfirmed = confirm(
        `Are you sure you want to edit ${trade.ticker} trade`
      );

      if (isConfirmed) {
        try {
          const updatedTrade = await tradesAPI.updateTrade(id, values);
          navigate(`/trades/${id}`);
        } catch (error) {
          setError(
            error.message || "An error occurred while creating the trade."
          );
        }
      }
    }
  );

  return (
    <div className="edit-trade-container">
      <h1>Edit Trade</h1>
      {error && <p className="error-message">{error}</p>}
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
