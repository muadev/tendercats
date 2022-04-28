import React, { useRef, useState } from "react"
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native"

const Match = () => {
  const [fondo, setFondo] = useState("steelblue")

  const pan = useRef(new Animated.ValueXY()).current
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }],
        // FIXME, Da error ponerlo en true por alguna razón.
        { useNativeDriver: false, listener: (event) => {
        }
      }),
      onPanResponderRelease: () => {
        const x = pan.x._value

        if (x > 200) {
          setFondo("red")
        // A la izquierda.
        } else if (x < -200) {
          setFondo("green")
        } else {
          setFondo("steelblue")
        }

        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start()
      }
    })
  ).current

  return (
    <View style={styles.contenedor}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <View style={ [styles.superior, { backgroundColor: fondo }] }/>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: "row",
  },
  superior: {
    flex: 1,
    minWidth: "101%",
    borderRadius: 5,
    margin: -1
  }
})

export default Match
