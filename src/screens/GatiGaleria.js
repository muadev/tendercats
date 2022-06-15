import { View, Text, FlatList } from 'react-native'
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
  'https://image.shutterstock.com/image-vector/abstract-stream-information-ball-array-600w-1927067009.jpg',
  'https://image.shutterstock.com/image-vector/abstract-stream-information-ball-array-600w-1927067009.jpg'
]

const GatiGaleria = ({ route }) => {
  const { gatiteId } = route.params

  return (
    <View>
      <Text>{gatiteId}</Text>
      <FlatList
        horizontal={false}
        numColumns={3}
        columnWrapperStyle={{ flex: 1 }}
        data={arrayImagenes}
        renderItem={({ item }) => <Media source={item} />}
      />
    </View>
  )
}

export default GatiGaleria
