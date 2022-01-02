// Punto de entrada a la aplicación, donde configuramos los providers, wrappers
// y demás.
import React from 'react'

import MainNavigation from 'navigation/Main'
import { UserProvider } from 'context/User'
import { ThemeProvider } from 'context/Theme'
import { DatabaseProvider } from 'context/Database'

const App = () => {
  return (
    <UserProvider>
      <DatabaseProvider>
        <ThemeProvider>
          {/* El contenedor de navegación que gestiona las diferentes pantallas. */}
          <MainNavigation />
        </ThemeProvider>
      </DatabaseProvider>
    </UserProvider>
  )
}

export default App
