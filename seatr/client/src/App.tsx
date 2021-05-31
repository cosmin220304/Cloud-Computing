import "./assets/index.scss";
import "./assets/atomic.scss";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import Authentication from "./screens/Authentication";
import Topnav from "./components/Topnav";
import Home from "./screens/Home";
import RestaurantHome from "./screens/RestaurantHome";
import RestaurantDashboard from "./screens/RestaurantDashboard";
import TellUsMore from "./screens/Authentication/TellUsMore";

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
          <Route exact path="/login"> <Authentication /> </Route>
          <Route exact path="/info"> <TellUsMore /> </Route>
          <Route>
            <Topnav />
            <PrivateRoute exact path="/" component={Home} /> 
            <PrivateRoute exact path="/restaurant" component={RestaurantHome} /> 
            <PrivateRoute exact path="/dashboard" component={RestaurantDashboard} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
