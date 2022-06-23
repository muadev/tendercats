import React, { useRef, useState, useEffect } from 'react'
import { Animated, View, StyleSheet, PanResponder, Text } from 'react-native'

import ImagenMatch from 'componentes/ImagenMatch'

const Match = () => {
  // TODO, Fondo debería ser la imagen inicial.
  const [fondo, setFondo] = useState()

  // Pedir imágenes del backend al azar, mostrar una inicial.
  useEffect(() => {
    const primera = 'https://firebasestorage.googleapis.com/v0/b/tender-cats.appspot.com/o/usuaries%2FiV9NGqjEQiMuNbbaho4t5NcDEN63%2F1648667158574-Screenshot_20220204-100154.png?alt=media&token=f4d8a4f0-b286-494f-b74a-2fdd9abd30a3'

    setFondo(primera)
  }, [])

  // Sacar de algún lado.
  const siguiente = 'https://firebasestorage.googleapis.com/v0/b/tender-cats.appspot.com/o/usuaries%2FISo9dhxftUOltw9eF1lJlIw3v9b2%2F1655932869800-a26e8f86-93a4-4a62-88c1-14f613d7a8d2.jpg?alt=media&token=414723ca-7c5a-43b8-96be-6c55552af52a'
  const pan = useRef(new Animated.ValueXY()).current
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      // Ignoramos el primer parámetro que recibe Animated.event.
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }],
        {
          useNativeDriver: false,
          // Esto tiene que matchear con los argumentos del evento previo.
          listener: (event, gestureState) => {
            const x = pan.x._value

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
        const x = pan.x._value

        if (x > 150) {
          // Realizar la acción de la derecha.
          // Fade out de la imagen actual, la siguiente se convierte en la actual.
          setFondo(siguiente)
        } else if (x < -150) {
          // Realizar la acción de la izquierda.
          // Fade out de la imagen actual, la siguiente se convierte en la actual.
        } else {
          // Abortar la acción.
          // Spring al centro con la imagen actual.
        }

        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start()
      }
    })
  ).current

  return (
    <View style={ styles.contenedor }>
      <Animated.View
        style={ {
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        } }
        { ...panResponder.panHandlers }
      >
        <View style={ styles.superior }>
          <ImagenMatch source={ fondo } />
        </View>
      </Animated.View>
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
  }
})

export default Match
