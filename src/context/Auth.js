// Contexto para proveer acceso al usuario.
import React, { createContext, useState, useEffect, useContext } from 'react'
import auth from '@react-native-firebase/auth'

// Exportamos el contexto en sí, para usar con `useContext` y pedir
// el valor.
export const AuthContext = createContext('')

export const AuthProvider = ({ children }) => {
  // Lleva el registro de si el sistema de autenticación terminó de
  // inicializar, para determinar si podemos salir del splash o no.
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    // Recibe los cambios de estado de Firebase cuando nos logueamos o
    // deslogueamos a través de auth().
    function onAuthStateChanged(authState) {
      setUser(authState)

      // Si hubo cambio de estado de autenticación es que terminamos de
      // inicializar.
      if (initializing) setInitializing(false)
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [initializing])

  return (
    <AuthContext.Provider value={{ user, initializing }}>
      {children}
    </AuthContext.Provider>
  )
}

// Exportar un hook que accede al contexto por comodidad.
export const useAuth = () => useContext(AuthContext)
