const { promises: fs } = require('fs')

const ruta = 'prueba.txt'

async function main() {

  // CRUD

  // Create (crear)
  try {
    await fs.writeFile(ruta, 'hola mundo!')
  } catch (error) {
    console.log(error.message)
  }

  // Read (leer)
  try {
    console.log(await fs.readFile(ruta, 'utf-8'))
  } catch (error) {
    console.log(error.message)
  }

  // Update (actualizar)
  try {
    await fs.writeFile(ruta, 'hola coderitos') // reemplaza todo el contenido existente por uno nuevo
    console.log(await fs.readFile(ruta, 'utf-8'))
    await fs.appendFile(ruta, '!') // agrega un nuevo contenido a continuacion del existente
    console.log(await fs.readFile(ruta, 'utf-8'))
  } catch (error) {
    console.log(error.message)
  }
  // Delete (borrar)
  try {
    // await fs.unlink(ruta)
  } catch (error) {
    console.log(error.message)
  }

}

main() // es asincronico, no bloqueante

console.log('terminé')