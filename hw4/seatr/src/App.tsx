import './assets/index.scss'
import './assets/atomic.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Authentication from './screens/Authentication'
import RestaurantReservations from './bundles/reservations/restaurantReservations'
import UserReservations from './bundles/reservations/userReservations'
import PrivateRoute from './utils/PrivateRoute'

function App() {
  return (
    <Router>
      <Route exact path='/login'>
        <Authentication />
      </Route>  

      <PrivateRoute exact path="/" component={UserReservations} />
      <PrivateRoute exact path="/restaurantReservation" component={RestaurantReservations} />
    </Router>
  )
}

export default App
