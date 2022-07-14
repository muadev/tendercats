import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import auth from '@react-native-firebase/auth'

import TextInputStandard from 'componentes/TextInputStandard'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  return (
    <View>
      <Text>Login</Text>

      <TextInputStandard
        label="Mi email es"
        onChangeText={ setEmail }
        value={ email }
        keyboardType="email-address"
      />

      <TextInputStandard
        label="Mi contraseña es"
        onChangeText={ setPassword }
        value={ password }
        secureTextEntry={ true }
      />

      <Button
        disabled= { email && password ? false : true }
        onPress={ () => {
          auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              // Acá no tenemos que llamar a ningún .navigate porque al
              // loguearnos se cambia el AuthState y por lo tanto se rerenderiza
              // todo.
              console.log('Logueadx!')
            })
            .catch(error => {
              console.error(error)
            })
        } }>
        Logueate
      </Button>
    </View>
  )
}

export default Login
