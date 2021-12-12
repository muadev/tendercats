import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

function App() {
  const [gato, setGato] = useState("Estado de un gato")

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        { gato }
      </Text>
      <TextInput
        style={{height: 40}}
        placeholder="Escribí acá para cambiar el estado del gato"
        onChangeText={text => setGato(text)}
      />
    </View>
  )
}

export default App
