import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { TouchableRipple, Text } from 'react-native-paper'

import { useTheme } from 'context/Theme'
// Para poder acceder al contexto de Usuario
import { UserContext } from 'context/User'

const Auth = ({ navigation }) => {
  const { colors } = useTheme()

  const user = React.useContext(UserContext).email

  return (
    <View>
      <Text>{user}</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Registrase" />
    </View>
  )
}

export default Auth
