// Mock de las funciones que llamamos sobre `database()`, y lo que esperamos
// que nos devuelva cada una.

// database().ref(...)
const ref = jest.fn(() => ({
  on: jest.fn()
}))

export default () => ({
  ref
})
