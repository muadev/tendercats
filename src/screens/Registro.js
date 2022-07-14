import React, { useState } from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import { useDatabase } from 'context/Database'

import TextInputConError from 'componentes/TextInputConError'
import TextInputStandard from 'componentes/TextInputStandard'

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
        label='Mi email es'
        onChangeText={ setEmail }
        value={ email }
        keyboardType="email-address"
        error={ error }
        tiposDeError= { ['auth/invalid-email', 'auth/email-already-in-use'] }
      />

      <TextInputConError
        label="Mi contraseña es"
        onChangeText={ setPassword }
        value={ password }
        secureTextEntry={ true }
        error= { error }
        tiposDeError= { ['auth/weak-password'] }
      />

      <TextInputStandard
        label="Mi nombre es"
        onChangeText={ setNombre }
        value={ nombre }
      />

      <TextInputStandard
        label="Mi bio es"
        onChangeText={ setBio }
        value={ bio }
        multiline
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
            .catch(e => {
              // Hace el catch del error, se llama "e" porque en Scope mas alto está "error".
              setError(e.code)
            })
        } }>
        Registrate
      </Button>
    </View>
  )
}

export default Registro
