import React from 'react'
import { Button, View, Text, PermissionsAndroid } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'

const SubirFoto = () => {
  const openPicker = async () => {
    launchImageLibrary(options, callback)
    // You can also use as a promise without 'callback':
    const result = await launchImageLibrary(options)
    console.log('Response = ', response)
  }

  return (
    <View>
      <Button title="Elegi una imagen" onPress={openPicker} />
    </View>
  )
}

export default SubirFoto
