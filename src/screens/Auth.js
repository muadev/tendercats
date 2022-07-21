import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'

const Auth = ({ navigation }) => {
  return (
    <View>
      <Button mode="contained" onPress={ () => navigation.navigate('Login') }>Login</Button>
      <Button mode="contained" onPress={ () => navigation.navigate('Registro') }>
        Registrarse
      </Button>
    </View>
  )
}

export default Auth
