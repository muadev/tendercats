// Contexto para proveer el tema preferido al resto de la app. Actualmente sólo
// pasa el `colorScheme` (light o dark) pero en un futuro puede pasar todo el
// StyleSheet.
import React, { createContext, useContext } from 'react'
import { useColorScheme } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'

import { Light, Dark } from 'assets/themes'

// Exportamos el contexto en sí, para usar con `useContext` y pedir
// el valor.
export const ThemeContext = createContext()

// Exportamos el proveedor de contexto.
export const ThemeProvider = ({ children }) => {
  // El resultado de useColorScheme puede ser:
  //   - light
  //   - dark
  //   - null: Si no especificó nada.
  // Entonces defaulteamos a light.
  const colorScheme = useColorScheme() || 'light'

  // Pasamos todo el theme como value del contexto y si necesitamos preguntar
  // si es dark, cada theme tiene una prop `dark` booleana que lo especifica.
  const theme = colorScheme === 'dark' ? Dark : Light

  return (
    <ThemeContext.Provider value={ theme }>
      <PaperProvider theme={ theme }>{ children }</PaperProvider>
    </ThemeContext.Provider>
  )
}

// Por si necesitamos acceso al theme directamente (por ejemplo para pasárselo
// al Navigator).
export const useTheme = () => useContext(ThemeContext)
