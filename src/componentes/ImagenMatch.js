// Incluye toda la información relacionada con una imagen durante el matcheo,
// todo lo arrastrable.
import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const ImagenMatch = ({ foto }) => {
  const { url, gatite } = foto

  return (
    <ImageBackground source={ { uri: url } } style={ styles.imagen }>
      <Text>{ gatite }</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imagen: {
    height: '100%'
  }
})

export default ImagenMatch
