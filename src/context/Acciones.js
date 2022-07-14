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

  /*
    crea /fotos/id con: *gatite *url
   */
  const crearFoto = (gatite, url) => {
    db.ref('/fotos').push({
      gatite: gatite,
      url: url
    })
  }
  /*
    si existe gatite para le usuarie: retorna gatite
    si no existe, crea:
     |_ gatites/id con: *nombre, *usuarie, *follows
     |_usuarie/id/minigatites/id con: *nombre, *portada
  */

  const cargarOCrearGatite = (gato, url) => {
    return db.ref(`/usuaries/${user.uid}`).child('minigatites').orderByChild("nombre").equalTo(gato).once("value").then(snapshot => {
      if (snapshot.exists()) {
        console.log(`Existe: ${snapshot.val()}`)
        // Devolvemos la key del unico gatite con este nombre.
        return Object.keys(snapshot.val())[0]
      } else {
        console.log(" No Existe")

        return db.ref('/gatites').push({
          nombre: gato,
          usuarie: user.uid,
          follows: 0
        })
        .then(gatite => {
          console.log(gatite.key)
          // Lo vincula en le usuarie.
          return db.ref(`/usuaries/${user.uid}`).child('minigatites').child(gatite.key).set({
            nombre: gato,
            portada: url
          }).then(() => { return gatite.key })
        })
      }
    })
  }

  const subirFotoAlStorage = (image, gato) => {
    const reference = storage().ref(`/usuaries/${user.uid}/${image.filename}`)
    reference
      .putFile(image.uri)
      .then(() => {
        reference
          .getDownloadURL()
          // TODO abstraer en cargarCrearGatite(nombre)
          .then(url => {
            // Crea gatite si no existe.
            cargarOCrearGatite(gato, url)
            .then( (gatite) => {
              console.log(`gatite devuelto: ${gatite}`)
              crearFoto(gatite, url)
            })
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Sube múltiples imagenes, todas ellas corresponden a cada unx de lxs gatites
  const subirFotosDeGatites = (nombres, imagenes) => {
    imagenes.map(image => {
      // TODO iterar sobre cada unx de lxs gatites
      const gato = nombres

      /*
        TODO investigar el encadenamiento de Promises o el uso de funciones thenable
        para encadenar el llamado de funciones y si alguna falla borrar las escrituras previas en la db. Ver:
        https://masteringjs.io/tutorials/fundamentals/promise-chaining
        https://masteringjs.io/tutorials/fundamentals/thenable
      */
      subirFotoAlStorage(image, gato)
    })
  }

  return (
    <AccionesContext.Provider value={ { subirFotosDeGatites } }>{ children }</AccionesContext.Provider>
  )
}

export const useAcciones = () => useContext(AccionesContext)