import React from 'react'
import { Image } from 'react-native'

const Media = ({ imagen }) => {
  console.log(imagen)
  return (
    <Image
      style={{ flex: 1 }}
      source={{
        uri: imagen
      }}
    />
  )
}

export default Media
