export default function TradeItem({ _id, img, ticker, date, username }) {
  return (
    <div className="trade-card" key={_id}>
      <img src={img} alt={ticker} className="trade-image" />
      <div className="trade-info">
        <h3>{ticker}</h3>
        <p>{date}</p>
        <p>Posted by: {username}</p>
      </div>
    </div>
  );
}
