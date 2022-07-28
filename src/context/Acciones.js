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
  const crearFoto = (gatiteId, url) => {
    db.ref('/fotos').push({
      gatite: gatiteId,
      url: url
    })
  }
  /*
    si existe gatite para le usuarie: retorna gatite
    si no existe, crea:
     |_ gatites/id con: *nombre, *usuarie, *follows
     |_usuarie/id/minigatites/id con: *nombre, *portada
  */

  // Recibe nombre de gatite y url, y devuelve el Id del gatite existente o del recien creado.
  const cargarOCrearGatite = (nombreDeGatite, url) => {
    return db.ref(`/usuaries/${user.uid}`).child('minigatites').orderByChild('nombre').equalTo(nombreDeGatite).once('value').then(snapshot => {
      if (snapshot.exists()) {
        // Devolvemos el Id del unico gatite con este nombre.
        return Object.keys(snapshot.val())[0]
      } else {
        return db.ref('/gatites').push({
          nombre: nombreDeGatite,
          usuarie: user.uid,
          follows: 0
        })
        .then(gatite => {
          // Lo vincula en le usuarie.
          return db.ref(`/usuaries/${user.uid}`).child('minigatites').child(gatite.key).set({
            nombre: nombreDeGatite,
            portada: url
          }).then(() => { return gatite.key })
        })
      }
    })
  }

  const subirFotoAlStorage = (archivoDeImagen, nombreDeGatite) => {
    const reference = storage().ref(`/usuaries/${user.uid}/${archivoDeImagen.filename}`)
    reference
      .putFile(archivoDeImagen.uri)
      .then(() => {
        reference
          .getDownloadURL()
          .then(url => {
            // Crea gatite si no existe.
            cargarOCrearGatite(nombreDeGatite, url)
            .then( (gatiteId) => {
              crearFoto(gatiteId, url)
            })
          })
          // TODO ver si este catch no es redundante por el encadenamiento de theneables.
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Sube múltiples imagenes, todas ellas corresponden a cada unx de lxs gatites
  const subirFotosDeGatites = (nombresDeGatites, archivosDeImagenes) => {
    archivosDeImagenes.map(archivoDeImagen => {
      // TODO iterar sobre cada unx de lxs gatites
      const gato = nombresDeGatites

      /*
        TODO investigar el encadenamiento de Promises o el uso de funciones thenable
        para encadenar el llamado de funciones y si alguna falla borrar las escrituras previas en la db. Ver:
        https://masteringjs.io/tutorials/fundamentals/promise-chaining
        https://masteringjs.io/tutorials/fundamentals/thenable
      */
      subirFotoAlStorage(archivoDeImagen, gato)
    })
  }

  return (
    <AccionesContext.Provider value={ { subirFotosDeGatites } }>{ children }</AccionesContext.Provider>
  )
}

export const useAcciones = () => useContext(AccionesContext)
