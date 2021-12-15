import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Un componente por pantalla.
import Demo from './screens/Demo'

// Se inicializa el navegador y se le anidan las pantallas.
const Stack = createNativeStackNavigator()

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Demo" component={ Demo } />
    </Stack.Navigator>
  )
}

export default MainNavigation
