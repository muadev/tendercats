// Mock de las funciones que llamamos sobre `auth()`, y lo que esperamos
// que nos devuelva cada una.

// auth().onAuthStateChanged(...)
const onAuthStateChanged = jest.fn()

export default () => ({
  onAuthStateChanged
})
