import { View, Text } from 'react-native'
import React from 'react'
import Media from 'componentes/Media'

const arrayImagenes = [
  'https://image.shutterstock.com/image-vector/abstract-stream-information-ball-array-600w-1927067009.jpg',
  'https://image.shutterstock.com/image-vector/abstract-stream-information-ball-array-600w-1927067009.jpg',
  'https://image.shutterstock.com/image-vector/abstract-stream-information-ball-array-600w-1927067009.jpg',
  'https://image.shutterstock.com/image-vector/abstract-stream-information-ball-array-600w-1927067009.jpg',
  'https://image.shutterstock.com/image-vector/abstract-stream-information-ball-array-600w-1927067009.jpg',
  'https://image.shutterstock.com/image-vector/abstract-stream-information-ball-array-600w-1927067009.jpg',
  'https://image.shutterstock.com/image-vector/abstract-stream-information-ball-array-600w-1927067009.jpg',
  'https://image.shutterstock.com/image-vector/abstract-stream-information-ball-array-600w-1927067009.jpg'
]

const GatiGaleria = () => {
  const renderMedia = () => {
    return arrayImagenes.map((image, index) => {
      return <Media imagen={ image } key={ index } />
    })
  }
  return (
    <View style={ { flex: 1 } }>
      <Text>GatiGaleria</Text>
      { renderMedia() }
    </View>
  )
}

export default GatiGaleria
