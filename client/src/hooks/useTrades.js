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
