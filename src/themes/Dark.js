// Derivamos el dark theme de nuestro default (light) theme.
import LightTheme from './Light'

export default {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    text: 'yellow'
  }
}
