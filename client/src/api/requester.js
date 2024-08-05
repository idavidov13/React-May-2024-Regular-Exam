import { getAccessToken } from "../utils/authUtils";

async function requester(method, url, data) {
  const options = {};

  const accessToken = getAccessToken();

  if (accessToken) {
    options.headers = {
      ...options.headers,
      "X-Authorization": accessToken,
    };
  }

  if (method !== "GET") {
    options.method = method;
  }

  if (data) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };

    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }

    if (response.status === 204) {
      return response;
    } else {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error("Error during fetch: ", error);
    throw error;
  }
}

export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const del = requester.bind(null, "DELETE");
