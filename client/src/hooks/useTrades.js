import { useEffect, useState } from "react";
import * as tradesAPI from "../api/trades-api";
export function useGetAllTrades() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    tradesAPI
      .getAll()
      .then((result) => {
        setTrades(result);
      })
      .catch((error) => console.error("Error fetching trades:", error));
  }, []);

  return [trades, setTrades];
}

export function useGetOneTrade(id) {
  const [trade, setTrade] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const result = await tradesAPI.getTradeById(id);
        setTrade(result);
      } catch (error) {
        console.error("Error fetching trade:", error);
      }
    })();
  }, [id]);

  return [trade, setTrade];
}

export function useCreateTrade() {
  const tradeCreateHandler = (tradeData) => {
    const result = tradesAPI.createTrade(tradeData);
    return result;
  };

  return tradeCreateHandler;
}
