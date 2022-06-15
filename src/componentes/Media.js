import React from 'react'
import { Image } from 'react-native'

const Media = ({ source }) => {
  return (
    <Image source={ { uri: source} }
      style={ {
        flex: 1,
        height:150
      } }
    />
  )
}

export default Media
