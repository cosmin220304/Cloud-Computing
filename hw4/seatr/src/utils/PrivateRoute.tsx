//Protected route wrapper
//https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs
import { useContext } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { AuthContext } from './AuthContext'

export default function PrivateRoute({component: Component, ...rest}: any) {
  let location = useLocation();
  const [user, ] = useContext(AuthContext) 
  
  return (
    <Route {...rest}
      render={(props) =>
        user
        ? (<Component {...props} />) 
        : (<Redirect to={{ pathname: '/login', state: { prevPath: location.pathname } }}/>)
      }
    />
  )
}
