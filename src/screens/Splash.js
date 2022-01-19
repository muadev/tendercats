import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

import { useTheme } from 'context/Theme'
import { useAuth } from 'context/User'
import images from 'assets/images'

const Splash = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { siguiente } = route.params
  const { initializing } = useAuth()

  // No se llama en el JSX mientras estamos initializing.
  const onPress = () => {
    navigation.replace(siguiente)
  }

  return (
    <TouchableRipple
      onPress={initializing ? null : onPress}
      style={[styles.tocable, { backgroundColor: colors.gradientEnd }]}>
      <View style={styles.contenedor}>
        <Image style={styles.logo} source={images.isotipo} />
      </View>
    </TouchableRipple>
  )
}

// Estilos estructurales. Lo que cambia con el theme se busca en el componente,
// con useTheme().
const styles = StyleSheet.create({
  tocable: {
    flex: 1
  },

  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    height: 200,
    width: 200
  }
})

export default Splash
