import React from "react";

const AllTrades = () => {
  const trades = [
    {
      id: 1,
      imageUrl:
        "https://www.investopedia.com/thmb/jDvAMaQurInmwXCaBedhXSRRUNc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/200113AAPLD-757c03fa7fe14f7cbc736c3ef8b16d82.JPG",
      tickerSymbol: "AAPL",
      date: "2024-08-01",
      username: "trader123",
    },
    {
      id: 2,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6RbFoHm-hBlxv3neSVkvF4xMlLuATARyJw&s",
      tickerSymbol: "BTC",
      date: "2024-08-02",
      username: "cryptoGuru",
    },
    {
      id: 3,
      imageUrl:
        "https://dbinvesting.com/wp-content/uploads/2023/09/Tesla-Stock-price-chart.png",
      tickerSymbol: "TSLA",
      date: "2024-08-03",
      username: "elonfan",
    },
  ];

  return (
    <div className="all-posted-trades">
      {trades.map((trade) => (
        <div className="trade-card" key={trade.id}>
          <img
            src={trade.imageUrl}
            alt={trade.tickerSymbol}
            className="trade-image"
          />
          <div className="trade-info">
            <h3>{trade.tickerSymbol}</h3>
            <p>{trade.date}</p>
            <p>Posted by: {trade.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTrades;
