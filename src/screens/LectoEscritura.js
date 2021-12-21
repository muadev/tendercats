import React, { useState, useEffect } from 'react'
import { Text, TextInput, View, Button } from 'react-native'
import database from '@react-native-firebase/database'

const LectoEscritura = ({ navigation }) => {
  const [gato, setGato] = useState('Estado de un gato')

  useEffect(() => {
    database().ref('/gatxs/').on('value', snapshot => {
      console.log(snapshot.val())
      setGato(snapshot.val() && snapshot.val()['gato11'])
    })
  })

  const update = (text) => {
    database().ref('/gatxs').update({gato11: text})
  }
    
  return (
    <View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          { gato }
        </Text>
      </View>

      <TextInput
          style={{height: 40}}
          placeholder= 'Ingresa un valor para Gato'
          onChangeText={text => update(text)}
      />
        <Text>
          { gato }
        </Text>
    <Button title='Volver a Demo' onPress={() => navigation.navigate('Demo')} />
    <Button title='Go Back' onPress={() => navigation.goBack} />
    </View>
  )
}

export default LectoEscritura
