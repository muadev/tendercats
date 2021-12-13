import React, { useState } from 'react'
import { Text, View } from 'react-native'
import database from '@react-native-firebase/database'

function App() {
  const [gato, setGato] = useState('Estado de un gato')

  database().ref('/gatxs/gato11').on('value', snapshot => {
    setGato(snapshot.val())
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        { gato }
      </Text>
    </View>
  )
}

export default App
