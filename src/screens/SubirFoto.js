import React from 'react'
import { Button, View, Image, StyleSheet } from 'react-native'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'

const SubirFoto = () => {
  const [imageUri, setImageUri] = React.useState(null)

  // Despliega el selector de imagenes.
  const openPicker = () => {
    const optionsPicker = {
      storageOptions: {
        // Opción de ImagePicker necesaria para evitar guardar la imagen.
        skipBackup: true
      }
    }
    launchImageLibrary(optionsPicker, response => {
      if (response.didCancel)
        console.log('ImagePicker cancelado por usuarie.')
       else if (response.error)
        console.log('ImagePicker Error: ', response.error)
       else
        // Response es un json con información de la imagen (filename, size, type, uri)
        setImageUri(response.assets[0].uri)

    })
  }

  // Abre la cámara.
  const usarCamera = () => {
    const optionsCamera = {
      storageOptions: {
        skipBackup: false
        // TODO: averiguar porqué no se almacena la imagen en este path, si no en /data/user/0/com.tendercats/cache/
        // path: 'ABCD'
      }
    }
    launchCamera(optionsCamera, response => {
      if (response.didCancel)
        console.log('ImagePicker cancelado por usuarie.')
       else if (response.error)
        console.log('ImagePicker Error: ', response.error)
       else
        setImageUri(response.assets[0].uri)

    })
  }

  return (
    <View>
      <Button title="Elegi una imagen existente" onPress={ openPicker } />
      <Button title="Abrir cámara" onPress={ usarCamera } />
      { imageUri === null ? (
        /* Imagen genérica de assets si le usuarie no eligió/tomo imagen aún. */
        <Image
          source={ require('../assets/images/no-image.png') }
          style={ styles.images }
        />
      ) : (
        /* Imagen preexistente de Galería o tomada con la Cámara. */
        <Image source={ { uri: imageUri } } style={ styles.images } />
      ) }
    </View>
  )
}

const styles = StyleSheet.create({
  images: {
    width: 150,
    height: 150,
    marginHorizontal: 3
  }
})

export default SubirFoto
