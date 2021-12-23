import React, { useState, useEffect, useContext } from 'react'
import { Text, TextInput, View, Button } from 'react-native'
import database from '@react-native-firebase/database'
import { DatabaseContext } from '../context/Database'

const LectoEscritura = ({ navigation }) => {
  const [gato, setGato] = useState('Estado de un gato')
  // Hay que pedir el contexto dentro del componente y no en useEffect().
  const db = useContext(DatabaseContext)

  useEffect(() => {
    // TODO, extraer referencia desde el componente a un archivo de queries.
    db.ref(`gatites/0`).on('value', snapshot => {
      setGato(snapshot.val().nombre)
    })
  })

  const update = (id, text) => {
    // TODO, extraer referencia desde el componente a un archivo de queries.
    db.ref(`gatites/${id}`).update({ nombre: text })
  }

  return (
    <View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{gato}</Text>
      </View>

      <TextInput
        style={{ height: 40 }}
        placeholder="Ingresa un valor para Gato"
        onChangeText={text => update(0, text)}
      />
      <Text>{gato}</Text>
      <Button
        title="Volver a Demo"
        onPress={() => navigation.navigate('Demo')}
      />
      <Button title="Go Back" onPress={() => navigation.goBack} />
    </View>
  )
}

export default LectoEscritura
