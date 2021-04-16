import { useEffect, useContext } from "react"
import firebaseConfig from "../../utils/firebaseConfig"
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css"
import firebase from "firebase"
import { AuthContext } from '../../utils/AuthContext' 

interface IProps {
  setIsNewUser: Function
}

export default function Login({ setIsNewUser }: IProps) {
  const [, setUser] = useContext(AuthContext) 
  
  useEffect(() => {
    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app()

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any) => {
          const user = authResult.user  
          const isNewUser = authResult.additionalUserInfo.isNewUser
          setUser(user)
          setIsNewUser(isNewUser)
          return false
        },
        uiShown: () => {
          document.querySelectorAll<HTMLElement>(".firebaseui-card-footer")[0].style.display = "none"
        },
      },
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: "RO",
        },
      ],
    }
    var ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start("#firebaseui-auth-container", uiConfig)
  }, [])

  return (
    <>
      <h1>REACT PHONE AUTHENTICATION</h1>
      <div id="firebaseui-auth-container"></div>
    </>
  )
}
