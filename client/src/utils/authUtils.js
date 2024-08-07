export const getAccessToken = () => {
  const authJSON = localStorage.getItem("auth");

  if (!authJSON) {
    return "";
  }

  const authData = JSON.parse(authJSON);

  return authData?.accessToken;
};

export function clearAuthData() {
  localStorage.removeItem("auth");
}

export function redirectToHome() {
  window.location.href = "/";
}
