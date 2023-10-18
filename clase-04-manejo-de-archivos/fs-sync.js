const fs = require('fs')

const ruta = 'prueba.txt'

function main() {

  // CRUD

  // Create (crear)
  try {
    fs.writeFileSync(ruta, 'hola mundo!')
  } catch (error) {
    console.log(error.message)
  }

  // Read (leer)
  try {
    console.log(fs.readFileSync(ruta, 'utf-8'))
  } catch (error) {
    console.log(error.message)
  }

  // Update (actualizar)
  try {
    fs.writeFileSync(ruta, 'hola coderitos') // reemplaza todo el contenido existente por uno nuevo
    console.log(fs.readFileSync(ruta, 'utf-8'))
    fs.appendFileSync(ruta, '!') // agrega un nuevo contenido a continuacion del existente
    console.log(fs.readFileSync(ruta, 'utf-8'))
  } catch (error) {
    console.log(error.message)
  }
  // Delete (borrar)
  try {
    fs.unlinkSync(ruta)
  } catch (error) {
    console.log(error.message)
  }

}

main()

console.log('terminé')