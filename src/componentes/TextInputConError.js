import React from 'react'
import { HelperText } from 'react-native-paper'
import errores from 'assets/strings/errores'

import TextInputStandard from 'componentes/TextInputStandard'

// Recibe tipos de error y el error en sí para el manejo del HelperText,
// y además cualquier otra props que vaya para el componente TextInput.
const TextInputConError = ({ tiposDeError, error, ...props }) => {
  return (
    <>
      <TextInputStandard
        { ...props }
      />

      { tiposDeError.includes(error) &&

        <HelperText type="error" visible={ true }>
          { errores[error] }
        </HelperText>
      }
    </>
  )
}

export default TextInputConError
