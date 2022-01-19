import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-paper'

const Auth = ({ navigation }) => {
  return (
    <View>
      <Button onPress={ () => navigation.navigate('Login') }>
        Login
      </Button>
      <Button>Registrase</Button>
    </View>
  )
}

export default Auth
