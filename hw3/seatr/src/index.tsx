import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./bundles/auth/LoginPage";
import ConfirmCodePage from "./bundles/auth/ConfirmCodePage";
import LoginWithPhonePage from "./bundles/auth/LoginWithPhonePage";
import TellUsMore from "./bundles/auth/TellUsMorePage";
import RestaurantReservations from "./bundles/reservations/restaurantReservations";
import UserReservations from "./bundles/reservations/userReservations";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/login">
        <LoginPage />
      </Route>

      <Route exact path="/confirm">
        <ConfirmCodePage />
      </Route>

      <Route exact path="/login/details">
        <TellUsMore />
      </Route>

      <Route exact path="/login/phone">
        <LoginWithPhonePage />
      </Route>
      {
        // the routing should be based on context rather than url
      }
      <Route exact path="/userReservation">
        <UserReservations />
      </Route>

      <Route exact path="/restaurantReservation">
        <RestaurantReservations restaurantName={"la cao"} />
      </Route>

      <Route exact path="/">
        <App />
      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
