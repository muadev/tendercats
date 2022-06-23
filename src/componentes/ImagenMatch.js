// Incluye toda la información relacionada con una imagen durante el matcheo,
// todo lo arrastrable.
import React from 'react'
import { Image, StyleSheet } from 'react-native'

const ImagenMatch = ({ source }) => {
  return (
    <Image source={ { uri: source } } style={ styles.imagen } />
  )
}

const styles = StyleSheet.create({
  imagen: {
    height: '100%'
  }
})

export default ImagenMatch
