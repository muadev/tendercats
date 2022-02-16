import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Para poder acceder al contexto de themes debe estar anidado en el proveedor,
// en `App.js`.
import { useTheme } from 'context/Theme'

// Para poder acceder al contexto de Usuario y armar la navegación.
import { useAuth } from 'context/Auth'

// Un componente por pantalla.
import Splash from 'screens/Splash'
import Auth from 'screens/Auth'
import Login from 'screens/Login'
import Demo from 'screens/Demo'
import LectoEscritura from 'screens/LectoEscritura'
import SubirFoto from 'screens/SubirFoto'

// Se inicializa el navegador y se le anidan las pantallas.
const Stack = createNativeStackNavigator()

const MainNavigation = () => {
  const { user, initializing } = useAuth()
  const theme = useTheme()

  // Sólo mostramos el Splash si estamos inicializando.
  if (initializing)
    return (
      <NavigationContainer theme={ theme }>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={ Splash }
            options={ { headerShown: false } }
          />
        </Stack.Navigator>
      </NavigationContainer>
    )


  // Determinamos qué bloque de pantallas cargar según si tenemos une usuarie
  // logueade o no ("protected routes"), por lo que los dos stacks nunca se ven
  // entre sí (es importante para saber qué rutas existen en cada stack).
  const Pantallas = user ? (
    <>
      <Stack.Screen name="LectoEscritura" component={ LectoEscritura } />
      <Stack.Screen name="Demo" component={ Demo } />
      <Stack.Screen name="SubirFoto" component={ SubirFoto } />
    </>
  ) : (
    <>
      <Stack.Screen name="Auth" component={ Auth } />
      <Stack.Screen
        name="Login"
        component={ Login }
        options={ { headerShown: false } }
      />
    </>
  )

  // El contenedor maneja el estado de la navegación y se encarga de cosas como
  // el deep linking y el botón de volver en Android.
  return (
    <NavigationContainer theme={ theme }>
      <Stack.Navigator>{ Pantallas }</Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
