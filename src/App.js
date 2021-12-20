// Punto de entrada a la aplicación, donde configuramos los providers, wrappers
// y demás.
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import MainNavigation from './MainNavigation'
import { ThemeProvider } from './context/Theme'

const App = () => {
  // El contenedor maneja el estado de la navegación y se encarga de cosas como
  // el deep linking y el botón de volver en Android.
  return (
    <ThemeProvider>
      <NavigationContainer>
        { /* El navegador principal que gestiona las diferentes pantallas. */ }
        <MainNavigation />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
