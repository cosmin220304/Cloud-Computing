import "./assets/index.scss";
import "./assets/atomic.scss";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import Authentication from "./screens/Authentication";
import Home from "./screens/Home";
import RestaurantReservations from "./bundles/reservations/restaurantReservations";
import UserReservations from "./bundles/reservations/userReservations";
import Topnav from "./components/Topnav";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3e605c",
    },
    secondary: {
      main: "#ff8c0a",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Authentication />
          </Route>
          <Route>
            <Topnav />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute
              exact
              path="/userReservations"
              component={UserReservations}
            />
            <PrivateRoute
              exact
              path="/restaurantReservation"
              component={RestaurantReservations}
            />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
