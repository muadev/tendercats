// Punto de entrada a la aplicación, donde configuramos los providers, wrappers
// y demás.
import React from 'react'

import MainNavigation from 'navigation/Main'
import { AuthProvider } from 'context/Auth'
import { ThemeProvider } from 'context/Theme'
import { DatabaseProvider } from 'context/Database'
import { AccionesProvider } from 'context/Acciones'

const App = () => {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <AccionesProvider>
          <ThemeProvider>
            {/* El contenedor de navegación que gestiona las diferentes pantallas. */}
            <MainNavigation />
          </ThemeProvider>
        </AccionesProvider>
      </DatabaseProvider>
    </AuthProvider>
  )
}

export default App
