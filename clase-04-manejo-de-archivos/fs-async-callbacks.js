const fs = require('fs')

const ruta = 'prueba.txt'

function main() {

  // CRUD

  // Create (crear)
  fs.writeFile(ruta, 'hola mundo!', (error, result) => {
    if (error) {
      console.log(error.message)
    } else {
      console.log('salio bien: escritura')
    }
  })

  // Read (leer)
  fs.readFile(ruta, 'utf-8', (error, result) => {
    if (error) {
      console.log(error.message)
    } else {
      console.log('salio bien: lectura')
      console.log(result)
    }
  })

  // Update (actualizar)
  fs.writeFile(ruta, 'hola coderitos', (error, result) => {
    if (error) {
      console.log(error.message)
    } else {
      console.log('salio bien: sobreescritura')
    }
  })

  // reemplaza todo el contenido existente por uno nuevo
  fs.readFile(ruta, 'utf-8', (error, result) => {
    if (error) {
      console.log(error.message)
    } else {
      console.log('salio bien: lectura')
      console.log(result)
    }
  })

  fs.appendFile(ruta, '!', (error, result) => {
    if (error) {
      console.log(error.message)
    } else {
      console.log('salio bien: modificacion')
    }
  })

  // agrega un nuevo contenido a continuacion del existente
  fs.readFile(ruta, 'utf-8', (error, result) => {
    if (error) {
      console.log(error.message)
    } else {
      console.log('salio bien: lectura')
      console.log(result)
    }
  })

  // Delete (borrar)
  fs.unlink(ruta, (error, result) => {
    if (error) {
      console.log(error.message)
    } else {
      console.log('salio bien: borrado')
    }
  })

}

main()

console.log('terminé')