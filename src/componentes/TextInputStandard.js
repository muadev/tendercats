import React from 'react'
import { TextInput } from 'react-native-paper'

// TextInput donde centralizar las configuraciones generales para ser más DRY.
const TextInputStandard = (props) => {
  return (
    <TextInput
      mode="outlined"
      autoCapitalize="none"
      { ...props }
    />
  )
}

export default TextInputStandard
