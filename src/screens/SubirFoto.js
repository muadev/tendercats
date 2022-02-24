import React, { useState } from 'react'
import { Button, View, Image, StyleSheet, TextInput } from 'react-native'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { useAuth } from 'context/Auth'
import { useDatabase } from 'context/Database'
import storage from '@react-native-firebase/storage'

const SubirFoto = () => {
  const [imageUri, setImageUri] = useState(null)
  const [imageNombre, setImageNombre] = useState(null)
  const [gato, setGato] = useState(null)

  const { user } = useAuth()
  const db = useDatabase()

  // Despliega el selector de imagenes.
  const openPicker = () => {
    const optionsPicker = {
      storageOptions: {
        // Opción de ImagePicker necesaria para evitar guardar la imagen.
        skipBackup: true
      }
    }

    launchImageLibrary(optionsPicker, response => {
      if (response.didCancel) {
        console.log('ImagePicker cancelado por usuarie.')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        // Response es un json con información de la imagen (filename, size, type, uri)
        const imagen = response.assets[0]

        setImageUri(imagen.uri)
        setImageNombre(imagen.fileName)
      }
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
      if (response.didCancel) {
        console.log('ImagePicker cancelado por usuarie.')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        const imagen = response.assets[0]

        setImageUri(imagen.uri)
        setImageNombre(imagen.fileName)
      }
    })
  }

  const subirFoto = async () => {
    const reference = storage().ref(`/usuaries/${user.uid}/${imageNombre}`)
    reference.putFile(imageUri).then(() => {
      reference.getDownloadURL().then((url) => {
          console.log(url)

          const gatite = db.ref("gatites").push( {
            // TODO que consuma el nombre del gato y no null
            nombre: gato,
            usuarie: "to be defined",
            follows: 0
          })

          gatite.child("fotos").push(url).then( (foto) => {
            db.ref(`fotos/${foto.key}`).set({ 
              gatite: gatite.key})
            })
          })
    })
  }

  return (
    <View>
      <Button onPress={ subirFoto }
        title="Guardar"
      />
      <Button title="Elegi una imagen existente" onPress={ openPicker } />
      <Button title="Abrir cámara" onPress={ usarCamera } />
      <TextInput
        style={ { height: 40 } }
        placeholder="Ingresa un valor para Gato"
        onSubmitEditing={ event => setGato(event.nativeEvent.text) }
      />

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
