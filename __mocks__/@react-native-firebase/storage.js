// Mock de las funciones que llamamos sobre `storage()`, y lo que esperamos
// que nos devuelva cada una.

// storage().ref(...)
const ref = jest.fn(() => ({
  on: jest.fn()
}))

export default () => ({
  ref
})
