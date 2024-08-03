import React, { useState } from "react";

export default function AddTrade() {
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [date, setDate] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [pl, setPl] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tickerSymbol || !date || !entryPrice || !quantity || !image) {
      setError("Please fill in the required fields.");
      return;
    }
    setError("");
    // Handle the form submission, e.g., send data to API
    console.log({
      tickerSymbol,
      date,
      entryPrice,
      quantity,
      exitPrice,
      pl,
      image,
    });
  };

  return (
    <div className="add-trade-container">
      <h1>Add Trade</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-trade-form">
        <div className="form-group">
          <label htmlFor="tickerSymbol">Ticker Symbol:</label>
          <input
            type="text"
            id="tickerSymbol"
            value={tickerSymbol}
            onChange={(e) => setTickerSymbol(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="entryPrice">Entry Price:</label>
          <input
            type="number"
            id="entryPrice"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            step="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exitPrice">Exit Price (Optional):</label>
          <input
            type="number"
            id="exitPrice"
            value={exitPrice}
            onChange={(e) => setExitPrice(e.target.value)}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pl">P/L (Optional):</label>
          <input
            type="number"
            id="pl"
            value={pl}
            onChange={(e) => setPl(e.target.value)}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image Link:</label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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
