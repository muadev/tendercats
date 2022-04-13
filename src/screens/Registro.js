import React, { useState } from 'react'
import { View } from 'react-native'
import { HelperText, Text, Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import { useDatabase } from 'context/Database'

import TextInputConError from 'componentes/TextInputConError'

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [nombre, setNombre] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')

  const db = useDatabase()

  return (
    <View>
      <Text>Registro</Text>

      <TextInputConError
        maxLength={ 64 }
        placeholder="Ingresa tu email.."
        keyboardType="email-address"
        onChangeText={ setEmail }
        value={ email }
        error= { error }
        tiposDeError= { ['auth/invalid-email', 'auth/email-already-in-use']}
      />

      <TextInputConError
        maxLength={ 64 }
        placeholder="Ingresa tu contraseña.."
        secureTextEntry={ true }
        onChangeText={ setPassword }
        value={ password }
        error= { error }
        tiposDeError= { ['auth/weak-password'] }
      />

      <TextInput
        placeholder="Ingresa tu nombre.."
        maxLength={ 64 }
        onChangeText={ setNombre }
        value={ nombre }
      />

      <TextInput
        placeholder="Ingresa tu bio.."
        multiline
        maxLength={ 100 }
        onChangeText={ setBio }
        value={ bio }
      />

      <Button
        disabled= { email && password && nombre ? false : true }
        onPress={ () => {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(respuesta => {
              db.ref(`/usuaries/${respuesta.user.uid}`).set({
                nombre: nombre,
                bio: bio,
                email: respuesta.user.email
              })
              // Acá no tenemos que llamar a ningún .navigate porque al
              // loguearnos se cambia el AuthState y por lo tanto se rerenderiza
              // todo.
              console.log('Registradx!')
            })
            .catch(error => {
              setError(error.code)
            })
        } }>
        Registrate
      </Button>
    </View>
  )
}

export default Registro
