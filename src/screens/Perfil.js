import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { Text, Button } from 'react-native-paper'
import { View } from 'react-native'
import { useDatabase } from 'context/Database'

const Perfil = ({ route }) =>{
  const [nombre, setNombre] = useState('Buscando')
  const [email, setEmail] = useState('Buscando')
  const [bio, setBio] = useState('Buscando')
  //TODO, en algún momento este estado debe pasar a ser un toast unificado para la app.
  const [alerta, setAlerta] = useState('')

  const db = useDatabase()
  const { uid } = route.params

  useEffect(() => {
    db.ref(`usuaries/${uid}`).once('value', snapshot => {
      // Los signos de pregunta habilitan a que cualquier intermediario sea null.
      const respuesta = snapshot?.val()

      setNombre(respuesta?.nombre)
      setEmail(respuesta?.email)
      setBio(respuesta?.bio)
    }).catch((error)=> {
      setAlerta(error.message)
      console.log(error.message)
    })
  }, [db, uid])

  return (

    <View>
      <Button
        onPress={ () =>
          auth().signOut().then(
            // Igual que en Login, no hay que navegar manualmente porque las
            // pantallas se rerenderizan sin user después de desloguearnos.
            console.log('Deslogueadx!')
          )
        }>
          Deslogueame
      </Button>

      <Text>{ nombre }</Text>
      <Text>{ email }</Text>
      <Text>{ bio }</Text>
      <Text>{ alerta }</Text>
    </View>
  )
}

export default Perfil
