import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useCreateTrade } from "../../hooks/useTrades";
import { useNavigate } from "react-router-dom";

const initialValues = {
  ticker: "",
  date: "",
  entryPrice: "",
  quantity: "",
  exitPrice: "",
  pl: "",
  img: "",
};

export default function AddTrade() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const createTrade = useCreateTrade();

  const createHandler = async (values) => {
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

    try {
      const createdTrade = await createTrade(values);

      if (!createdTrade || !createdTrade._id) {
        throw new Error("Trade creation failed or missing _id in response");
      }

      const tradeId = createdTrade._id;
      navigate(`/trades/${tradeId}`);
    } catch (error) {
      setError(error.message || "An error occurred while creating the trade.");
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    createHandler
  );

  return (
    <div className="add-trade-container">
      <h1>Add Trade</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={submitHandler} className="add-trade-form">
        <div className="form-group">
          <label htmlFor="tickerSymbol">* Ticker Symbol:</label>
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
          <label htmlFor="date">* Date:</label>
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
          <label htmlFor="entryPrice">* Entry Price:</label>
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
          <label htmlFor="quantity">* Quantity:</label>
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
          <label htmlFor="image">* Image Link:</label>
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
          Add Trade
        </button>
      </form>
    </div>
  );
}
