import { useState, useContext } from "react"
import Home from './Home'
import Login from './Login'
import TellUsMore from './TellUsMore'
import { AuthContext } from '../../utils/AuthContext'
import { Redirect, useLocation } from 'react-router-dom' 

export default function Authentication() { 
  let location: any = useLocation()
  const [goToLogin, setGoToLogin] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [user, ] = useContext(AuthContext) 

  if (!goToLogin) {
    return (
      <Home setGoToLogin={setGoToLogin}/>
    )
  }

  if (isNewUser) {
    return (
      <TellUsMore setIsNewUser={setIsNewUser} />
    )
  }
 
  if (!user || user === 'undefined') {
    return ( 
      <Login setIsNewUser={setIsNewUser} />
    )
  }
  
  return(
    <Redirect to={{pathname: location.state ? location.state.prevPath : '/'}} />
  )
}
