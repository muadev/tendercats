// Punto de entrada a la aplicación, donde configuramos los providers, wrappers
// y demás.
import React from 'react'

import MainNavigation from './MainNavigation'
import { ThemeProvider } from './context/Theme'
import { DatabaseProvider } from './context/Database'

const App = () => {
  return (
    <DatabaseProvider>
      <ThemeProvider>
        {/* El contenedor de navegación que gestiona las diferentes pantallas. */}
        <MainNavigation />
      </ThemeProvider>
    </DatabaseProvider>
  )
}

export default App
