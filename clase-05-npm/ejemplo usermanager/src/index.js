const { UserManager } = require('./UserManager.js')

async function main() {
  const um = new UserManager('./db/usuarios.json')
  await um.vaciarUsuarios()

  console.log(await um.obtenerUsuarios())

  await um.registrar({
    nombre: 'marian',
    apellido: 'profe',
    nombreUsuario: 'pmarian',
    contrasenia: '1234'
  })

  try {
    await um.registrar({
      nombre: 'marian',
      apellido: 'profe',
      nombreUsuario: 'pmarian',
      contrasenia: '1234'
    })
  } catch (error) {
    console.log(error.message)
  }

  console.log(await um.obtenerUsuarios())

  const usuarioLogueado = await um.loguear({ nombreUsuario: 'pmarian', contrasenia: '1234' })
  console.log(usuarioLogueado)

  try {
    await um.loguear({ nombreUsuario: 'pmarian', contrasenia: 'abcd' })
  } catch (error) {
    console.log(error.message)
  }

  try {
    await um.loguear({ nombreUsuario: 'marian', contrasenia: '1234' })
  } catch (error) {
    console.log(error.message)
  }

}

main()