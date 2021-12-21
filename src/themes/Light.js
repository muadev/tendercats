// Ejemplo de modificación del theme default de Paper.
import { DefaultTheme } from 'react-native-paper'

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'red'
  }
}
