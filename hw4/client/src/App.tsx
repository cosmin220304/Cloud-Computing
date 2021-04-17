import './assets/index.scss'
import './assets/atomic.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import Authentication from './screens/Authentication'
import Home from './screens/Home'
import RestaurantReservations from './bundles/reservations/restaurantReservations'
import UserReservations from './bundles/reservations/userReservations'

function App() {
  return (
    <Router>
      <Route exact path='/login'>
        <Authentication />
      </Route>  

      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/userReservations" component={UserReservations} />
      <PrivateRoute exact path="/restaurantReservation" component={RestaurantReservations} />
    </Router>
  )
}

export default App
