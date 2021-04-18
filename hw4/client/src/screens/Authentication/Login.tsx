import { useEffect, useContext } from 'react'
import firebaseConfig from '../../utils/firebaseConfig'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import firebase from 'firebase'
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
          setIsNewUser(isNewUser)
          setUser({
            phoneNumber: user.phoneNumber,
            uid: user.uid,
          })
          return false
        },
        uiShown: () => { 
          // Note: forgive me for I have sinned but I did what I had to do ->
          //        -> to make it look like in design without actually implementing the hard stuff
          document.querySelectorAll<HTMLElement>('#firebaseui-auth-container')[0].style.paddingTop = '5rem'
          document.querySelectorAll<HTMLElement>('.firebaseui-card-header')[0].className = ''
          document.querySelectorAll<HTMLElement>('.firebaseui-title')[0].style.textAlign = 'center'
          document.querySelectorAll<HTMLElement>('.firebaseui-container')[0].style.backgroundColor = 'transparent'
          document.querySelectorAll<HTMLElement>('.firebaseui-container')[0].classList.remove('mdl-shadow--2dp')
          document.querySelectorAll<HTMLElement>('.firebaseui-card-footer')[0].style.display = 'none'
        },
      },
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: 'RO',
        },
      ],
    } 
    var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }, [])

  return (
    <> 
      <div id='firebaseui-auth-container'></div>
    </>
  )
}
