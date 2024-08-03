import { useContext } from "react";
import { login, register } from "../api/auth-api";
import { AuthContext } from "../context/authContext";

export const useLogin = () => {
  const { changeAuthState } = useContext(AuthContext);

  const loginHandler = async (email, password) => {
    const { password: _, ...authData } = await register(email, password);

    changeAuthState(authData);
  };
  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useContext(AuthContext);

  const registerHandler = async (email, password) => {
    const { password: _, ...authData } = await register(email, password);

    changeAuthState(authData);
  };
  return registerHandler;
};
