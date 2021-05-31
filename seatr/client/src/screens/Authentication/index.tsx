import React, { useState, useContext } from "react";
import Home from "./Home";
import Login from "./Login";
import TellUsMore from "./TellUsMore";
import { AuthContext } from "../../utils/AuthContext";
import { Redirect, useLocation } from "react-router-dom";

export default function Authentication() {
  let location: any = useLocation();
  const [goToLogin, setGoToLogin] = useState(false);
  const [user] = useContext(AuthContext);

  if (!goToLogin) {
    return <Home setGoToLogin={setGoToLogin} />;
  }

  if (!user || user === "undefined") {
    return <Login />;
  }

  if (user.isNewUser) {
    return <TellUsMore />;
  }

  return (
    <Redirect
      to={{ pathname: location.state ? location.state.prevPath : "/" }}
    />
  );
}
