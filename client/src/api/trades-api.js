import * as request from "./requester.js";

const BASE_URL = "http://localhost:3030/data/trades";

export const getAll = async () => {
  const result = await request.get(BASE_URL);
  return Object.values(result);
};

export const getTradeById = async (id) => {
  const result = await request.get(`${BASE_URL}/${id}`);
  return result;
};

export const createTrade = async (tradeData) => {
  const result = await request.post(BASE_URL, tradeData);
  return result;
};

export const deleteTrade = async (tradeId) => {
  const result = await request.del(`${BASE_URL}/${tradeId}`);
  return result;
};

export const updateTrade = async (tradeId, tradeData) => {
  const result = await request.put(`${BASE_URL}/${tradeId}`, tradeData);
  return result;
};
