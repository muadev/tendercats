import React, { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import ImagePicker from 'react-native-image-crop-picker'

import { useAuth } from 'context/Auth'
import { useDatabase } from 'context/Database'
import storage from '@react-native-firebase/storage'

const SubirFoto = () => {
  // Array de {uri, filename}
  const [imagenes, setImagenes] = useState([])
  const [gato, setGato] = useState(null)

  const { user } = useAuth()
  const db = useDatabase()

  // Procesa la uri de la imagen para tomar nombre y extensión y le apenda un timestamp.
  const filenameConTimestamp = uri => {
    new Date().getTime() + '-' + uri.substring(uri.lastIndexOf('/') + 1, uri.length)
  }

  // Esperando mergeo de issue #1243 de react-native-image-crop-picker para funcionalidad combinada de multiple y cropping.
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
      // TO-DO Desglosar por error de usr canceló seleccion o no otorgó permisos de STORAGE.
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
      //TO-DO Desglosar por error de usr canceló seleccion o no otorgó permisos de STORAGE.
      .catch(error => {
        console.error(error)
      })
  }

  const subirFoto = async () => {
    imagenes.map(image => {
      const reference = storage().ref(`/usuaries/${user.uid}/${image.filename}`)
      reference
        .putFile(image.uri)
        .then(() => {
          reference
            .getDownloadURL()
            .then(url => {
              const gatite = db.ref('/gatites').push({
                nombre: gato,
                usuarie: user.uid,
                follows: 0
              })
              // Crea gatite y le agrega la foto.
              gatite
                .child('fotos')
                .push(url)
                .then(foto => {
                  db.ref(`/fotos/${foto.key}`).set({
                    gatite: gatite.key
                  })
                })
                .catch(error => {
                  console.log(error)
                })
              // Lo vincula en el usuarie.
              db.ref(`/usuaries/${user.uid}`).child('minigatites').child(gatite.key).set({
                nombre: gato,
                portada: url
              })
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  return (
    <View>
      <Button disabled={ gato ? false : true } onPress={ subirFoto }>
        { `Guardar ${imagenes.length}` }
      </Button>
      <Button onPress={ seleccionar }>Elegi una imagen existente</Button>
      <Button onPress={ tomarFoto }>Abrir cámara</Button>
      <TextInput
        placeholder="Ingresa un valor para Gato"
        onChangeText={ nombre => setGato(nombre) }
      />

      { imagenes.length === 0 ? (
        /* Imagen genérica de assets si le usuarie no eligió/tomo imagen aún. */
        <Image source={ require('../assets/images/no-image.png') } style={ styles.images } />
      ) : (
        /* Imagen preexistente de Galería o tomada con la Cámara. */
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
