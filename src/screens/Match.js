import React, { useRef, useState } from 'react'
import { Animated, View, StyleSheet, PanResponder, Text } from 'react-native'

const Match = () => {
  // TODO, Fondo debería ser la imagen inicial.
  const [fondo, setFondo] = useState('steelblue')
  const [moveX, setMoveX] = useState(0)
  const [moveY, setMoveY] = useState(0)
  const [releaseX, setReleaseX] = useState(0)
  const [releaseY, setReleaseY] = useState(0)

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

            setMoveX(x)
            setMoveY(pan.y._value)

            if (x > 200) {
              // Preview de la acción a la derecha.
              setFondo('yellow')
            } else if (x < -200) {
              // Preview de la acción a la izquierda.
              setFondo('purple')
            } else {
              // No debería hacer nada.
              setFondo('white')
            }
          }
        }
      ),
      onPanResponderRelease: () => {
        const x = pan.x._value

        setReleaseX(x)
        setReleaseY(pan.y._value)

        if (x > 200) {
          // Realizar la acción de la derecha.
          setFondo('red')
        } else if (x < -200) {
          // Realizar la acción de la izquierda.
          setFondo('green')
        } else {
          // Abortar la acción.
          setFondo('steelblue')
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
        <View style={ [styles.superior, { backgroundColor: fondo }] }>
          <Text>move x: { moveX }</Text>
          <Text>move y: { moveY }</Text>
          <Text>release x: { releaseX }</Text>
          <Text>release y: { releaseY }</Text>
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
    flex: 1,
    minWidth: '101%',
    borderRadius: 5,
    margin: -1
  }
})

export default Match
