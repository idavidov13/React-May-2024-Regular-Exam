import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import * as tradesAPI from "../../api/trades-api";
import * as likesAPI from "../../api/likes-api";

const TradeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useAuthContext();

  const [trade, setTrade] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tradeDetails = await tradesAPI.getTradeById(id);
        setTrade(tradeDetails);

        const likesCount = await likesAPI.allLikesByTradeId(id);
        setLikes(likesCount);

        if (userId) {
          const likedStatus = await likesAPI.isLiked(id, userId);
          setIsLiked(likedStatus > 0);
        }
      } catch (error) {
        console.error("Error fetching trade details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, userId]);

  const isOwner = userId === trade?._ownerId;

  const tradeDeleteHandler = async () => {
    const isConfirmed = confirm(
      `Are you sure you want to delete the ${trade.ticker} trade?`
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

  const tradeLikeHandler = async () => {
    try {
      await likesAPI.likeTrade(id);
      const updatedLikes = await likesAPI.allLikesByTradeId(id);
      const likedStatus = await likesAPI.isLiked(id, userId);

      setLikes(updatedLikes);
      setIsLiked(likedStatus > 0);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <p>Loading trade details...</p>;
  }

  if (!trade) {
    return <p>Trade not found.</p>;
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
            <strong>P/L:</strong> {trade["pl"] ? trade["pl"] : "TBD"}
          </p>
          <p>
            <strong>Likes:</strong> {likes}
          </p>
          {isOwner && (
            <div className="details-links">
              <Link
                to="#"
                onClick={tradeDeleteHandler}
                className="details-link"
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
          )}
          {!isOwner && isAuthenticated && (
            <div className="details-links">
              {isLiked ? (
                <span className="liked">Liked!</span>
              ) : (
                <button onClick={tradeLikeHandler} className="details-link">
                  Like
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeDetails;
