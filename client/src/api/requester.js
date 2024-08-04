async function requester(method, url, data) {
  const options = {};

  const accessToken = localStorage.getItem("accessToken");

  if (method !== "GET") {
    options.method = method;

    if (accessToken) {
      options.headers = {
        ...options.headers,
        "X-Authorization": accessToken,
      };
    }

    if (data) {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };

      options.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(url, options);

    const result = await response.json();

    if (!response.ok) {
      throw result.message;
    }

    return result;
  } catch (error) {
    console.error("Error during fetch: ", error);
    throw error;
  }
}

export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const del = requester.bind(null, "DELETE");
