import React, { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import ImagePicker from 'react-native-image-crop-picker'

import { useAuth } from 'context/Auth'
import { useDatabase } from 'context/Database'
import TextInputStandard from 'componentes/TextInputStandard'
import storage from '@react-native-firebase/storage'
import { useAcciones } from 'context/Acciones'

const SubirFoto = () => {
  // Array de {uri, filename}
  const [imagenes, setImagenes] = useState([])
  const [gato, setGato] = useState(null)

  const { subirFotosDeGatites } = useAcciones()

  // Procesa la uri de la imagen para tomar nombre y extensión y le agrega un timestamp.
  const filenameConTimestamp = uri => {
    return new Date().getTime() + '-' + uri.substring(uri.lastIndexOf('/') + 1, uri.length)
  }

  // Esperando mergeo de issue #1243 de react-native-image-crop-picker para
  // funcionalidad combinada de multiple y cropping.
  // https://github.com/ivpusic/react-native-image-crop-picker/issues/1243
  const seleccionar = () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: true
    })
      .then(images => {
        let seleccionadas = []
        images.map(image => {
          let uri = image.path
          seleccionadas = [...seleccionadas, { uri: uri, filename: filenameConTimestamp(uri) }]
        })
        setImagenes(seleccionadas)
      })
      // TODO, Desglosar por error de usr canceló seleccion o no otorgó permisos de STORAGE.
      .catch(error => {
        console.error(error)
      })
  }

  const tomarFoto = () => {
    ImagePicker.openCamera({
      cropping: true
    })
      .then(image => {
        let uri = image.path
        setImagenes([{ uri: uri, filename: filenameConTimestamp(uri) }])
      })
      // TODO, Desglosar por error de usr canceló seleccion o no otorgó permisos de STORAGE.
      .catch(error => {
        console.error(error)
      })
  }

  const subirFoto = async () => {
    // TODO, Permitir varios nombres de gatites.
    subirFotosDeGatites(gato, imagenes)
  }

  return (
    <View>
      <Button disabled={gato ? false : true} onPress={subirFoto}>
        {`Guardar ${imagenes.length}`}
      </Button>
      <Button onPress={seleccionar}>Elegi una imagen existente</Button>
      <Button onPress={tomarFoto}>Abrir cámara</Button>
      <TextInputStandard label="Les gatites de la foto son" onChangeText={setGato} />

      {imagenes.length === 0 ? (
        /* Imagen genérica de assets si le usuarie no eligió/tomo imagen aún. */
        <Image source={require('../assets/images/no-image.png')} style={styles.images} />
      ) : (
        /* Imagen preexistente de Galería o tomada con la Cámara. */
        imagenes.map((imagen, index) => {
          return <Image key={index} source={{ uri: imagen.uri }} style={styles.images} />
        })
      )}
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
