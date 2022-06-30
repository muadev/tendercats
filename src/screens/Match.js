import React, { useRef, useState, useEffect } from 'react'
import { Animated, View, ImageBackground, StyleSheet, PanResponder } from 'react-native'
import { IconButton, Colors } from 'react-native-paper'

import ImagenMatch from 'componentes/ImagenMatch'
import { useDatabase } from 'context/Database'

const Match = () => {
  const [fotos, setFotos] = useState({ actual: 'a', siguiente: 'b' })
  const [likeade, setLikeade] = useState(false)

  const db = useDatabase()

  // Pedir imágenes del backend al azar, mostrar una inicial.
  useEffect(() => {
    // https://rnfirebase.io/reference/database/query
    db.ref('/fotos').limitToFirst(2).once('value', snapshot => {
      // TODO, Contemplar los casos iniciales cuando no hay imágenes o sólo hay 1.
      setFotos({
        actual: Object.values(snapshot?.val())[0],
        siguiente: Object.values(snapshot?.val())[-1]
      })
    })
  }, [db])

  // El valor actual (x,y) del centro de la imagen.
  const coordenadas = useRef(new Animated.ValueXY()).current

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    // Ignoramos el primer parámetro que recibe Animated.event.
    onPanResponderMove: Animated.event([null, { dx: coordenadas.x, dy: coordenadas.y }],
      {
        useNativeDriver: false,
        // Esto tiene que matchear con los argumentos del evento previo.
        listener: (event, gestureState) => {
          const x = coordenadas.x._value

          if (x > 150) {
            // Preview de la acción a la derecha.
            // Mostrar feedback de lo que va a pasar. Se ve la siguiente de fondo.
          } else if (x < -150) {
            // Preview de la acción a la izquierda.
            // Mostrar feedback de lo que va a pasar. Se ve la siguiente de fondo.
          } else {
            // No debería hacer nada.
          }
        }
      }
    ),
    onPanResponderRelease: () => {
      const x = coordenadas.x._value

      if (x > 150) {
        // Realizar la acción de la derecha.
        // Fade out de la imagen actual, la siguiente se convierte en la actual.
        likear()
      } else if (x < -150) {
        // Realizar la acción de la izquierda.
        // Fade out de la imagen actual, la siguiente se convierte en la actual.
      } else {
        // Abortar la acción.
        // Spring al centro con la imagen actual.
      }

      Animated.spring(coordenadas, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start()
    }
  })

  const likear = () => {
    setFotos({ actual: fotos.siguiente, siguiente: fotos.actual })
    setLikeade(true)
  }

  return (
    <View style={ styles.contenedor }>
      <View style={ styles.superior }>
        <ImageBackground source={ { uri: fotos.siguiente?.url } }>
          <Animated.View
            style={ {
              transform: [{ translateX: coordenadas.x }, { translateY: coordenadas.y }]
            } }
            { ...panResponder.panHandlers }
          >
            <ImagenMatch foto={ fotos.actual } />
          </Animated.View>
        </ImageBackground>

        <View style={ styles.botonera }>
          <IconButton
            icon={ likeade ? "heart" : "heart-outline"}
            color={ Colors.red700 }
            onPress={ likear }/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'row'
  },
  superior: {
    minWidth: '100%'
  },
  botonera: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1
  }
})

export default Match
