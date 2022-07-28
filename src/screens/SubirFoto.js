import React, { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import ImagePicker from 'react-native-image-crop-picker'

import TextInputStandard from 'componentes/TextInputStandard'
import { useAcciones } from 'context/Acciones'

const SubirFoto = () => {
  const [imagenes, setImagenes] = useState([])
  const [gato, setGato] = useState(null)

  const { subirFotosDeGatites } = useAcciones()

  // Arma el nombre de la imagen que va al storage. Con la forma: timestamp + nombre del archivo + extension.
  const filenameConTimestamp = uri => {
    return new Date().getTime() + '-' + uri.substring(uri.lastIndexOf('/') + 1, uri.length)
  }

  // Esperando mergeo de issue #1243 de react-native-image-crop-picker para
  // funcionalidad combinada de multiple y cropping.
  // https://github.com/ivpusic/react-native-image-crop-picker/issues/1243
  const seleccionarDesdeGaleria = () => {
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

  const seleccionarDesdeCamara = () => {
    ImagePicker.openCamera({
      cropping: true
    })
      .then(image => {
        let uri = image.path
        setImagenes([{ uri: uri, filename: filenameConTimestamp(uri) }])
      })
      // TODO, Desglosar por error de usr canceló seleccion o no otorgó permisos de Cámara.
      .catch(error => {
        console.error(error)
      })
  }

  const guardar = async () => {
    // TODO, Permitir varios nombres de gatites.
    subirFotosDeGatites(gato, imagenes)
  }

  return (
    <View>
      <Button disabled={ gato ? false : true } onPress={ guardar }>Guardar</Button>
      <Button onPress={ seleccionarDesdeGaleria }>Seleccionar desde galería</Button>
      <Button onPress={ seleccionarDesdeCamara }>Tomar Foto</Button>
      <TextInputStandard label="Les gatites de la foto son" onChangeText={ setGato } />

      { imagenes.length === 0 ? (
        /* Muestra imagen genérica de assets si le usuarie no eligió/tomo imagen aún. */
        <Image source={ require('../assets/images/no-image.png') } style={ styles.images } />
      ) : (
        /* Previsualiza imagen/es preexistente/s de Galería o tomada con la Cámara. */
        imagenes.map((imagen, index) => {
          return <Image key={ index } source={ { uri: imagen.uri } } style={ styles.images } />
        })
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