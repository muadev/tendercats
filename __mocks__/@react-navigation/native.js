// Mock de los objetos que importamos de react-navigation/native.
const DarkTheme = {}
const DefaultTheme = {}
const NavigationContainer = jest.fn().mockReturnValue(null)

export {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
}
