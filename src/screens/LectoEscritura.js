import React, { useState, useEffect, useContext } from 'react'
import { Text, TextInput, View, Button } from 'react-native'
import { DatabaseContext } from 'context/Database'

const LectoEscritura = ({ navigation }) => {
  const [gato, setGato] = useState('Buscando gati..')
  // Hay que pedir el contexto dentro del componente y no en useEffect().
  const db = useContext(DatabaseContext)

  useEffect(() => {
    // TODO, extraer referencia desde el componente a un archivo de queries.
    // Cambiamos de .on a .once para leer una sola vez la DB hasta que hagamos un update.
    db.ref(`gatites/0`).once('value', snapshot => {
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
      {/* Usamos defaultValue para que se inicialice el elemento con el valor default mientras busca el de la DB. Si es null aparece el placeholder. */}
      <TextInput
        style={{ height: 40 }}
        placeholder="Ingresa un valor para Gato"
        onSubmitEditing={event => update(0, event.nativeEvent.text)}
        defaultValue={gato}
      />

      <Text>{gato}</Text>

      <Button
        title="Volver a Demo"
        onPress={() => navigation.navigate('Demo')}
      />
      <Button title="Go Back" onPress={() => navigation.goBack} />
    </View>
  )
}

export default LectoEscritura
