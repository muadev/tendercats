module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    // Desactivar las reglas de prettier porque de todas maneras lo estamos
    // usando antes.
    'prettier/prettier': 0,
    // Nunca usar ; al final de las líneas.
    semi: [1, 'never', { beforeStatementContinuationChars: 'always' }],
    // Nunca dejar una , al final de los items en arrays y objetos.
    'comma-dangle': [1, 'never'],
    // Forzar a que haya espacios entre { } incluso en jsx.
    'react/jsx-curly-spacing': [
      1,
      { when: 'always', children: { when: 'always' } }
    ],
    // Forzar llaves alrededor de bloques cuando necesiten más de una línea.
    curly: [1, 'multi']
  }
}
