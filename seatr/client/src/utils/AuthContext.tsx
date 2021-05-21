import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = React.createContext<[any, Function]>([{}, () => {}]);

const AuthContextWrapper = ({ children }: any) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [user, setUser] = useState(cookies.user);

  useEffect(() => {
    setCookie("user", user);
  }, [user]);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextWrapper, AuthContext };
