import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import { Text, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'

import { useTheme } from 'context/Theme'
import images from 'assets/images'

const Login = ({ navigation }) => {
  const [mail, onChangeMail] = React.useState(null)
  const [password, onChangePassword] = React.useState(null)

  const { colors } = useTheme()

  return (
    <View>
      <Text>Login</Text>

      <TextInput
        placeholder="Ingresa tu mail.."
        onChangeText={onChangeMail}
        value={mail}
      />

      <TextInput
        placeholder="Ingresa tu contraseña.."
        onChangeText={onChangePassword}
        value={password}
      />

      <Button
        mode="contained"
        onPress={() => {
          auth().signInWithEmailAndPassword(mail, password)
          navigation.navigate('Demo')
        }}>
        Logueate
      </Button>
    </View>
  )
}

export default Login
