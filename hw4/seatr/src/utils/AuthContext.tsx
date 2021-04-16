import React, { useState } from 'react'

const AuthContext = React.createContext<[any, Function]>([{}, ()=>{}])

const AuthContextWrapper = ({ children }: any) => {
  const [user, setUser] = useState()
  
  return (
    <AuthContext.Provider value={[user, setUser]}>
        {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContextWrapper,
  AuthContext,
}