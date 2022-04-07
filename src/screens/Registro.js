import React, { useState } from 'react'
import { View } from 'react-native'
import { HelperText, Text, Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import { useDatabase } from 'context/Database'

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [nombre, setNombre] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')

  const db = useDatabase()

  const diccionario = {
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres",
    "auth/invalid-email": "Email inválido",
    // Evitamos dar información sobre usuaries existentes.
    "auth/email-already-in-use": "Email inválido"
  }
  return (
    <View>
      <Text>Registro</Text>

      <TextInput
        placeholder="Ingresa tu email.."
        keyboardType="email-address"
        maxLength={ 64 }
        onChangeText={ setEmail }
        value={ email }
      />

      { (error == "auth/invalid-email" || error == "auth/email-already-in-use") &&
      <HelperText type="error" visible={true}>
        { diccionario[error] }
      </HelperText>
      }

      <TextInput
        placeholder="Ingresa tu contraseña.."
        secureTextEntry={ true }
        maxLength={ 64 }
        onChangeText={ setPassword }
        value={ password }
      />

      { error == "auth/weak-password" &&
      <HelperText type="error" visible={true}>
        { diccionario[error] }
      </HelperText>
      }

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
