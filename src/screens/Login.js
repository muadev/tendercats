import React from 'react'
import { View, TextInput } from 'react-native'
import { Text, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'

const Login = ({ navigation }) => {
  const [mail, onChangeMail] = React.useState(null)
  const [password, onChangePassword] = React.useState(null)

  // TODO, Hacer los inputs `required`.
  return (
    <View>
      <Text>Login</Text>

      <TextInput
        placeholder="Ingresa tu mail.."
        keyboardType="email-address"
        maxLength={ 64 }
        onChangeText={ onChangeMail }
        value={ mail }
      />

      <TextInput
        placeholder="Ingresa tu contraseña.."
        secureTextEntry={ true }
        maxLength={ 64 }
        onChangeText={ onChangePassword }
        value={ password }
      />

      <Button
        onPress={ () => {
          auth().signInWithEmailAndPassword(mail, password).then(() => {
            // Acá no tenemos que llamar a ningún .navigate porque al
            // loguearnos se cambia el AuthState y por lo tanto se rerenderiza
            // todo.
            console.log('Logueadx!')
          }).catch(error => {
            console.error(error)
          })
        } }>
        Logueate
      </Button>
    </View>
  )
}

export default Login
