import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { TouchableRipple, Text, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'

import { useTheme } from 'context/Theme'
import images from 'assets/images'

const Login = ({ navigation }) => {
  const { colors } = useTheme()

  // const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  function onAuthStateChanged(user) {
    setUser(user)
    // if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  // Este initializing tendría que chequear si estás logueado.
  if (user) return null

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <Button
          title="Logueame"
          onPress={() =>
            auth().signInWithEmailAndPassword('cambiame@ejemplo.com', '123456')
          }
        />
      </View>
    )
  }

  return (
    <TouchableRipple
      onPress={() => navigation.replace('Demo')}
      style={[styles.tocable, { backgroundColor: colors.gradientEnd }]}>
      <View style={styles.contenedor}>
        <Image style={styles.logo} source={images.isotipo} />
      </View>
    </TouchableRipple>
  )
}

// Estilos estructurales. Lo que cambia con el theme se busca en el componente,
// con useTheme().
const styles = StyleSheet.create({
  tocable: {
    flex: 1
  },

  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    height: 200,
    width: 200
  }
})

export default Login
