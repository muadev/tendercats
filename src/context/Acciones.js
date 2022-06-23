import React, { createContext, useContext } from 'react'
import storage from '@react-native-firebase/storage'

import { useAuth } from 'context/Auth'
import { useDatabase } from 'context/Database'

// Exportamos el contexto en sí, para usar con `useContext` y pedir
// el valor.
export const AccionesContext = createContext()

// Exportamos el proveedor de contexto.
export const AccionesProvider = ({ children }) => {
  const { user } = useAuth()
  const db = useDatabase()

  // Sube múltiples imagenes, todas ellas corresponden a cada unx de lxs gatites
  const subirFotosDeGatites = (nombres, imagenes) => {
    console.log(nombres)
    console.log(imagenes)

    imagenes.map(image => {
      // TODO iterar sobre cada unx de lxs gatites
      const gato = nombres

      // TODO abstraer en subirFotoStorage()
      const reference = storage().ref(`/usuaries/${user.uid}/${image.filename}`)
      reference
        .putFile(image.uri)
        .then(() => {
          reference
            .getDownloadURL()
            // TODO abstraer en cargarCrearGatite(nombre)
            .then(url => {
              // Crea gatite si no existe.
              const gatite = db.ref('/gatites').push({
                nombre: gato,
                usuarie: user.uid,
                follows: 0
              })
              // Lo vincula en le usuarie.
              db.ref(`/usuaries/${user.uid}`).child('minigatites').child(gatite.key).set({
                nombre: gato,
                portada: url
              })
              // TODO Ante un gatite existente, no crearlo, sólo devolver su ID.
              // TODO abstraer en crearFoto(gatite, url)
              gatite
                .child('fotos')
                .push(url)
                .then(foto => {
                  db.ref(`/fotos/${foto.key}`).set({
                    gatite: gatite.key
                    // TODO agregar campo url
                  })
                })
                .catch(error => {
                  console.log(error)
                })
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  return (
    <AccionesContext.Provider value={{ subirFotosDeGatites }}>{children}</AccionesContext.Provider>
  )
}

export const useAcciones = () => useContext(AccionesContext)
