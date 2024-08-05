import * as request from "./requester.js";

const endpoints = {
  likeTrade: "http://localhost:3030/data/likes",
  allLikesByTradeId: (tradeId) =>
    `http://localhost:3030/data/likes?where=tradeId%3D%22${tradeId}%22&distinct=_ownerId&count`,
  isLiked: (tradeId, userId) =>
    `http://localhost:3030/data/likes?where=tradeId%3D%22${tradeId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export const likeTrade = async (tradeId) => {
  const result = await request.post(endpoints.likeTrade, { tradeId });
  return result;
};

export const allLikesByTradeId = async (tradeId) => {
  const result = await request.get(endpoints.allLikesByTradeId(tradeId));
  return result;
};

export const isLiked = async (tradeId, userId) => {
  const result = await request.get(endpoints.isLiked(tradeId, userId));
  return result;
};
