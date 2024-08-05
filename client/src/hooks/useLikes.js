import { useState, useEffect, useCallback } from "react";
import * as likesAPI from "../api/likes-api";

export function useLikeTrade() {
  const [error, setError] = useState(null);

  const likeTrade = useCallback(async (tradeId) => {
    try {
      await likesAPI.likeTrade(tradeId);
      const updatedLikes = await likesAPI.allLikesByTradeId(tradeId);
      return updatedLikes;
    } catch (err) {
      setError(err);
      console.error("Error liking trade:", err);
      throw err;
    }
  }, []);

  return { likeTrade, error };
}

export function useGetAllLikesOneTrade(tradeId) {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const result = await likesAPI.allLikesByTradeId(tradeId);
        setLikes(result);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [tradeId]);

  return likes;
}

export function useGetTradeIsLiked(tradeId, userId) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchIsLiked = async () => {
      try {
        const result = await likesAPI.isLiked(tradeId, userId);
        setIsLiked(result > 0);
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    if (userId) {
      fetchIsLiked();
    }
  }, [tradeId, userId]);

  return isLiked;
}
