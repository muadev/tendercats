// Contexto para proveer acceso a la base de datos. Nos permite aislarnos un
// poquito de la inicialización y configuración de firebase.
import React, { createContext, useContext } from 'react'
import database from '@react-native-firebase/database'

// Exportamos el contexto en sí, para usar con `useContext` y pedir
// el valor.
export const DatabaseContext = createContext()

// Exportamos el proveedor de contexto.
export const DatabaseProvider = ({ children }) => {
  return (
    <DatabaseContext.Provider value={ database() }>
      { children }
    </DatabaseContext.Provider>
  )
}

// Exportamos funciones de utilidad para abstraer un poco la estructura de la
// base de datos.
export const useGatites = () => useContext(DatabaseContext).ref('gatites')
export const useGatite = id => useContext(DatabaseContext).ref(`gatites/${id}`)
