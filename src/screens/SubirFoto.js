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

  const selectImage = () => {
    console.log('echoed')
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }
        console.log(source)
        setImage(source)
      }
    })
  }

  return (
    <View>
      <Button title="Elegi una imagen" onPress={openPicker} />
    </View>
  )
}

export default SubirFoto
