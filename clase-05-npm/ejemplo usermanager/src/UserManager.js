const { promises: fs } = require('fs')
const { Usuario } = require('./Usuario.js')
const { crearSalt, encriptar } = require('./criptografia.js')

class UserManager {
  constructor(ruta) {
    this.ruta = ruta
  }

  async registrar({ nombre, apellido, nombreUsuario, contrasenia }) {
    const usuarios = await this.#leerUsuariosDesdeJson()

    const existe = usuarios.find(u => u.nombreUsuario === nombreUsuario)
    if (existe) {
      throw new Error('el nombre de usuario ya existe')
    }

    const id = crypto.randomUUID()
    const salt = crearSalt()
    contrasenia = encriptar(contrasenia, salt)

    const nuevoUsuario = new Usuario({
      id,
      nombre,
      apellido,
      nombreUsuario,
      contrasenia,
      salt
    })

    usuarios.push(nuevoUsuario)
    await this.#guardarUsuariosEnJson(usuarios)
    return nuevoUsuario.paraMostrar()
  }

  async loguear({ nombreUsuario, contrasenia }) {
    const usuarios = await this.#leerUsuariosDesdeJson()
    const buscado = usuarios.find(u => u.nombreUsuario === nombreUsuario)
    if (!buscado) {
      throw new Error('credenciales invalidas')
    }
    const contraseniaRecibidaEncriptada = encriptar(contrasenia, buscado.salt)
    if (buscado.contrasenia !== contraseniaRecibidaEncriptada) {
      throw new Error('credenciales invalidas')
    }
    return buscado.paraMostrar()
  }

  async obtenerUsuarios() {
    const usuarios = await this.#leerUsuariosDesdeJson()
    return usuarios.map(u => u.paraMostrar())
  }

  async vaciarUsuarios() {
    await this.#guardarUsuariosEnJson([])
  }

  async #guardarUsuariosEnJson(usuarios) {
    await fs.writeFile(this.ruta, JSON.stringify(usuarios, null, 2))
  }

  async #leerUsuariosDesdeJson() {
    const jsonStringConUsuarios = await fs.readFile(this.ruta, 'utf-8')
    const arrayDeObjetosUsuario = JSON.parse(jsonStringConUsuarios)
    const instanciasDeUsuario = arrayDeObjetosUsuario.map(o => new Usuario(o))
    return instanciasDeUsuario
  }
}

exports.UserManager = UserManager