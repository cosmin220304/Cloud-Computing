//Protected route wrapper
//inspired by:
// https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs
import React from "react";
import { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function PrivateRoute({ component: Component, ...rest }: any) {
  let location = useLocation();
  const [user] = useContext(AuthContext);
  console.log("authentification details:", user);

  return (
    <Route
      {...rest}
      render={(props) => {
        
        if (!user || user === "undefined") {
          return <Redirect to={{ pathname: "/login", state: { prevPath: location.pathname } }} />
        }

        if (!user.email) {
          return <Redirect to={{ pathname: "/info" }} />
        }

        return <Component {...props} />
      }}
    />
  );
}
