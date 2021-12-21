import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Para poder acceder al contexto de themes debe estar anidado en el proveedor,
// en `App.js`.
import { useTheme } from 'context/Theme'

// Un componente por pantalla.
import Splash from 'screens/Splash'
import Demo from 'screens/Demo'
import LectoEscritura from 'screens/LectoEscritura'

// Se inicializa el navegador y se le anidan las pantallas.
const Stack = createNativeStackNavigator()

const MainNavigation = () => {
  // El contenedor maneja el estado de la navegación y se encarga de cosas como
  // el deep linking y el botón de volver en Android.
  return (
    <NavigationContainer theme={useTheme()}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Demo" component={Demo} />
        <Stack.Screen name="LectoEscritura" component={ LectoEscritura } />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
