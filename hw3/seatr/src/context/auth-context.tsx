import React, { createContext, useContext, useState } from "react";
import { tokenToString } from "typescript";
interface AuthProiderProps {
  children: any;
}
interface AuthContext {
  token: string | null;
  userDetails: {
    email: string | null;
    phoneNumber: string | null;
  };
  restaurantDetails?: {
    restaurantName: string;
  };
  login: Function;
  register: Function;
  logout: Function;
}
const defaultAuthContext: AuthContext = {
  token: null,
  userDetails: {
    email: null,
    phoneNumber: null,
  },
  login: () => {},
  register: () => {},
  logout: () => {},
};
const AuthContext = createContext(defaultAuthContext);

const AuthProvider = (props: AuthProiderProps) => {
  const authContext = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    email: null,
    phoneNumber: null,
  });
  const [token, setToken] = useState("");
  const login = (email: string, password: string) => {};
  const register = (email: string) => {};
  const logout = () => {
    setToken("");
    setUserDetails({ email: null, phoneNumber: null });
  };
  authContext.login = login;
  authContext.register = register;
  authContext.login = logout;
  return (
    <AuthContext.Provider
      value={{ token, userDetails, login, register, logout }}
      {...props}
    />
  );
};
export { AuthProvider, AuthContext };
