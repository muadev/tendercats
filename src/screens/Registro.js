import React, { useState } from 'react'
import { View } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import { useDatabase } from 'context/Database'

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [nombre, setNombre] = useState('')
  const [bio, setBio] = useState('')

  const db = useDatabase()

  return (
    <View>
      <Text>Registro</Text>

      <TextInput
        placeholder="Ingresa tu mail.."
        keyboardType="email-address"
        maxLength={ 64 }
        onChangeText={ setEmail }
        value={ email }
      />

      <TextInput
        placeholder="Ingresa tu contraseña.."
        secureTextEntry={ true }
        maxLength={ 64 }
        onChangeText={ setPassword }
        value={ password }
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
              console.error(error)
            })
        } }>
        Registrate
      </Button>
    </View>
  )
}

export default Registro
