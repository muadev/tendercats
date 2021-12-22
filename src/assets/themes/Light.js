// Light theme.
import { DefaultTheme as LightNavigationTheme } from '@react-navigation/native'
import { DefaultTheme as LightPaperTheme } from 'react-native-paper'

// Integramos los themes default de React Navigation y Paper antes de
// hacer las modificaciones para el light theme.
export default {
  ...LightNavigationTheme,
  ...LightPaperTheme,
  name: 'Light',
  colors: {
    ...LightNavigationTheme.colors,
    ...LightPaperTheme.colors,
    // Necesitamos una librería externa para hacer gradientes pero ya lo dejo
    // acá.
    gradientStart: 'rgba(48,39,122,1)',
    gradientEnd: 'rgba(105,62,212,1)'
  }
}
