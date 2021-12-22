// Punto de entrada a la aplicación, donde configuramos los providers, wrappers
// y demás.
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import MainNavigation from './MainNavigation'
import { ThemeProvider } from './context/Theme'
import { DatabaseProvider } from './context/Database'

const App = () => {
  return (
    <DatabaseProvider>
      <ThemeProvider>
        {/* El contenedor maneja el estado de la navegación y se encarga de
          cosas como el deep linking y el botón de volver en Android. */}
        <NavigationContainer>
          {/* El navegador principal que gestiona las diferentes pantallas. */}
          <MainNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </DatabaseProvider>
  )
}

export default App
