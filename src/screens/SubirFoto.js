import React from 'react'
import { View, Text } from 'react-native'

const SubirFoto = () => {
  // TO-Do @max connectar con storage real y no storage()
  const reference = storage().ref('sm.png')

  return (
    <View>
      <Button
        onPress={async () => {
          // Para que ande crear imagen en sdcard -> Pictures -> sm.png
          // path to existing file on filesystem
          const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/sm.png`
          // uploads file
          await reference.putFile(pathToFile)
        }}
      />
    </View>
  )
}

export default SubirFoto
