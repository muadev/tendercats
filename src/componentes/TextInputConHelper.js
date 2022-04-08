import React from 'react'
import { View } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'

const EvaluarError = (error) => {
  let mensajeDeError = ''

  switch (error) {
    case 'auth/weak-password':
      mensajeDeError = 'La contraseña debe tener al menos 6 caracteres'
      break
    case 'auth/invalid-email':
    // Evitamos dar información sobre usuaries existentes.
    case 'auth/email-already-in-use':
      mensajeDeError = 'Email inválido'
      break
    default:
      return null
  }

  return (
    <HelperText type="error" visible={ true }>
      { mensajeDeError }
    </HelperText>
  )
}

//Recibe tipos de error y el error en sí para el manejo del HelperText, y además cualquier otra props que vaya para el componente TextInput.
const TextInputConHelper = ({tiposDeError, error, ...props}) => {
  return (
    <View>
      <TextInput
        { ...props }
      />
      { tiposDeError.includes(error) && EvaluarError(error) }
    </View>
  )
}

export default TextInputConHelper
