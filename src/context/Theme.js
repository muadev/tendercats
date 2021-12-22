/* Contexto para proveer el tema preferido al resto de la app. Actualmente sólo
 * pasa el `colorScheme` (light o dark) pero en un futuro puede pasar todo el
 * StyleSheet.
 */
import React, { createContext } from 'react'
import { Appearance } from 'react-native'

// Exportamos el contexto en sí, para usar con `useContext` y pedir
// el valor.
export const ThemeContext = createContext()

// Exportamos el proveedor de contexto.
export const ThemeProvider = ({ children }) => {
  // El resultado de getColorScheme puede ser:
  //   - light
  //   - dark
  //   - null: Si no especificó nada.
  // Entonces defaulteamos a light.
  const colorScheme = Appearance.getColorScheme() || 'light'

  return (
    <ThemeContext.Provider value={colorScheme}>
      {children}
    </ThemeContext.Provider>
  )
}
