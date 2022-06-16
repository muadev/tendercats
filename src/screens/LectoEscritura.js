import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { useDatabase } from 'context/Database'
import { useAuth } from 'context/Auth'

const LectoEscritura = ({ navigation }) => {
  const [gato, setGato] = useState('Buscando gati..')
  // Hay que pedir el contexto dentro del componente y no en useEffect().
  const db = useDatabase()
  const { uid } = useAuth().user

  useEffect(() => {
    // TODO, extraer referencia desde el componente a un archivo de queries.
    // Cambiamos de .on a .once para leer una sola vez la DB hasta que hagamos un update.
    db.ref('gatites/0').once('value', snapshot => {
      // Los signos de pregunta habilitan a que cualquier intermediario sea null.
      setGato(snapshot?.val()?.nombre)
    })
  })

  const update = (id, text) => {
    // TODO, extraer referencia desde el componente a un archivo de queries.
    db.ref(`gatites/${id}`).update({ nombre: text })
    // Como estamos desacoplado de la DB tenemos que actualizar el estado manualmente.
    setGato(text)
  }

  return (
    <View>
      { /* Usamos defaultValue para que se inicialice el elemento con el valor default mientras busca el de la DB. Si es null aparece el placeholder. La nueva versión de react-native-paper rompe la funcionalidad esperando issue react-native-paper/issues/3144 */ }
      <TextInput
        placeholder="Ingresa un valor para Gato"
        onSubmitEditing={ event => update(0, event.nativeEvent.text) }
        defaultValue={ gato }
      />

      <Text>{ gato }</Text>

      <Button onPress={ () => navigation.navigate('Perfil', { uid: uid }) }>
        Ir a Perfil
      </Button>
      <Button onPress={ () => navigation.navigate('SubirFoto') }>
        Subir una imagen
      </Button>
      <Button onPress={ () => navigation.navigate('Match') }>
        MichiMatch
      </Button>
      <Button onPress={ () => navigation.goBack }>
        Go Back
      </Button>
    </View>
  )
}

export default LectoEscritura
