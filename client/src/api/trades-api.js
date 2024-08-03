import * as request from "./requester";

const BASE_URL = "http://localhost:3030/jsonstore/trades";

export const getAll = async () => {
  const result = await request.get(BASE_URL);

  const trades = Object.values(result);
  return trades;
};
