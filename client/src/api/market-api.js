const API_KEY = "1V5L57A8ZQMWX73J";
const BASE_URL = "https://www.alphavantage.co/query";

export const fetchMarketData = async () => {
  const response = await fetch(
    `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=SPY&apikey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch market data");
  }

  const data = await response.json();
  return data;
};
