import * as request from "./requester.js";

const BASE_URL = "http://localhost:3030/jsonstore/trades";

export const getAll = async () => {
  const result = await request.get(BASE_URL);
  return Object.values(result);
};

export const getTradeById = async (id) => {
  const result = await request.get(`${BASE_URL}/${id}`);
  return result;
};
