import React from 'react'
import { View } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'

const diccionario = {
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
  'auth/invalid-email': 'Email inválido',
  // Evitamos dar información sobre usuaries existentes.
  'auth/email-already-in-use': 'Email inválido'
}


const TextInputConHelper = ({placeholder, keyboardType, onChangeText, email, error}) => {
  return (
    <View>
      <TextInput
        placeholder= { placeholder }
        keyboardType={ keyboardType }
        maxLength={ 64 }
        onChangeText={ onChangeText }
        value= { email }
      />

      { (error == 'auth/invalid-email' || error == 'auth/email-already-in-use') &&
      <HelperText type="error" visible={ true }>
        { diccionario[error] }
      </HelperText>
      }
    </View>
  )
}

export default TextInputConHelper
