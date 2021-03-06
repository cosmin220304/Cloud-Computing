import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextWrapper } from "./utils/AuthContext";
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from "./utils/reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextWrapper>
      <App />
    </AuthContextWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
serviceWorkerRegistration.register();
