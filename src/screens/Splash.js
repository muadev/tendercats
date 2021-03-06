import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import { useTheme } from 'context/Theme'
import images from 'assets/images'

const Splash = () => {
  const { colors } = useTheme()

  return (
    <View style={ [styles.tocable, { backgroundColor: colors.gradientEnd }] }>
      <View style={ styles.contenedor }>
        <Image style={ styles.logo } source={ images.isotipo } />
      </View>
    </View>
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
