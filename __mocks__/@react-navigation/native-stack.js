// Mock de los objetos que importamos de react-navigation/native-stack.
const createNativeStackNavigator = jest.fn(() => ({
  Navigator: jest.fn(),
  Screen: jest.fn()
}))

export {
  createNativeStackNavigator
}
