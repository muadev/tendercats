// Contexto para proveer acceso al usuario.
import React, { createContext, useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'

// Exportamos el contexto en sí, para usar con `useContext` y pedir
// el valor.
export const UserContext = createContext('')

export const UserProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    function onAuthStateChanged(user) {
      setUser(user)
      if (initializing) setInitializing(false)
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [initializing])

  if (initializing) return null

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
