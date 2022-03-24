import React, { useState } from 'react'
import { Button, View, Image, StyleSheet, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import { useAuth } from 'context/Auth'
import { useDatabase } from 'context/Database'
import storage from '@react-native-firebase/storage'

const SubirFoto = () => {
  const [imagenes, setImagenes] = useState([])
  const [gato, setGato] = useState(null)

  const { user } = useAuth()
  const db = useDatabase()

  // Esperando mergeo de issue #1243 de react-native-image-crop-picker para funciononalidad combinada de multiple y cropping.
  const seleccionar = () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: true
    }).then(images => {
      let seleccionadas = []
      images.map(image => {
        let uri = image.path
        let fileName = new Date().getTime() + "-" + uri.substring(uri.lastIndexOf("/") + 1, uri.length)

        seleccionadas = [...seleccionadas, { "uri": uri, "fileName": fileName} ]
      })
      setImagenes(seleccionadas)
    })
  }

  const subirFoto = async () => {
    imagenes.map(image => {
      const reference = storage().ref(`/usuaries/${user.uid}/${image.fileName}`)
      reference.putFile(image.uri).then(() => {
        reference.getDownloadURL().then(url => {
          const gatite = db.ref('gatites').push({
            nombre: gato,
            usuarie: user.uid,
            follows: 0
          })

          gatite
            .child('fotos')
            .push(url)
            .then(foto => {
              db.ref(`fotos/${foto.key}`).set({
                gatite: gatite.key
              })
            })
        })
      })
    })
  }

  return (
    <View>
      <Button onPress={ subirFoto } title={ `Guardar ${imagenes.length}` } />
      <Button title="Elegi una imagen existente" onPress={ seleccionar } />
      <Button title="Abrir cámara" />
      <TextInput
        style={ { height: 40 } }
        placeholder="Ingresa un valor para Gato"
        onChangeText={ nombre => setGato(nombre) }
      />

      { imagenes.length === 0 ? (
        /* Imagen genérica de assets si le usuarie no eligió/tomo imagen aún. */
        <Image source={ require('../assets/images/no-image.png') } style={ styles.images } />
      ) : (
        /* Imagen preexistente de Galería o tomada con la Cámara. */
        imagenes.map( (imagen, index) => {
          return (
            <Image key={index} source={ { uri: imagen.uri } } style={ styles.images } />
          )}
        )
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
