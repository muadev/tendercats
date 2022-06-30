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
    gatite
      .child('fotos')
      .push(url)
      .then(foto => {
        db.ref(`/fotos/${foto.key}`).set({
          gatite: gatite.key,
          url: url
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  /*
    si existe gatite para le usuarie: retorna gatite
    si no existe, crea:
     |_ gatites/id con: *nombre, *usuarie, *follows
     |_usuarie/id/minigatites/id con: *nombre, *portada
  */
  const cargarOCrearGatite = (gato, url) => {
    let gatite 

    return db.ref(`/usuaries/${user.uid}`).child('minigatites').orderByChild("nombre").equalTo(gato).once("value").then(snapshot => {
      if (snapshot.exists()) {
        console.log("Existe")
        console.log(snapshot)
        console.log(snapshot.val())
        
        gatite = snapshot.val()

      } else {
        console.log(" No Existe")
        console.log(snapshot)

        gatite = db.ref('/gatites').push({
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
      }
    })
    return gatite
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
            const gatite = cargarOCrearGatite(gato, url)

            crearFoto(gatite, url)
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
