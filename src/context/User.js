// Contexto para proveer acceso al usuario.
import React, { createContext, useContext, useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'

// Exportamos el contexto en sí, para usar con `useContext` y pedir
// el valor.
export const UserContext = createContext('')

const user = "prueba"

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}
