// Dark theme.
import { DarkTheme as DarkNavigationTheme } from '@react-navigation/native'
import { DarkTheme as DarkPaperTheme } from 'react-native-paper'

// Integramos los themes default de React Navigation, Paper antes de
// hacer las modificaciones para el dark theme.
export default {
  ...DarkNavigationTheme,
  ...DarkPaperTheme,
  name: 'Dark',
  colors: {
    ...DarkNavigationTheme.colors,
    ...DarkPaperTheme.colors,
    text: 'yellow'
  }
}
