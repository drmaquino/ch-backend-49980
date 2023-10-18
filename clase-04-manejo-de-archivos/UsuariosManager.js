const { promises: fs } = require('fs')

class Usuario {
  constructor({ id, nombre, apellido, edad, curso }) {
    this.id = id
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
    this.curso = curso
  }
}

class UsuariosManager {
  #usuarios

  constructor({ ruta }) {
    this.ruta = ruta
    this.#usuarios = []
  }

  #generarId() {
    if (this.#usuarios.length > 0) {
      return this.#usuarios[this.#usuarios.length - 1].id + 1
    } else {
      return 1
    }
  }

  async reset() {
    this.#usuarios = []
    await this.#escribirUsuarios()
  }

  async #leerUsuarios() {
    const usuariosEnJson = await fs.readFile(this.ruta, 'utf-8')
    const datosUsuariosArray = JSON.parse(usuariosEnJson)
    this.#usuarios = datosUsuariosArray.map(j => new Usuario(j))
  }

  async #escribirUsuarios() {
    const usuariosJson = JSON.stringify(this.#usuarios, null, 2)
    await fs.writeFile(this.ruta, usuariosJson)
  }

  async addUser({ nombre, apellido, edad, curso }) {
    await this.#leerUsuarios()
    const id = this.#generarId()
    const usuario = new Usuario({ id, nombre, apellido, edad, curso })
    this.#usuarios.push(usuario)
    await this.#escribirUsuarios()
    return usuario
  }

  async getUsers() {
    await this.#leerUsuarios()
    return this.#usuarios
  }

  async updateUser(id, userData) {
    await this.#leerUsuarios()
    const index = this.#usuarios.findIndex(u => u.id === id)
    if (index !== -1) {
      const nuevoUsu = new Usuario({ id, ...this.#usuarios[index], ...userData })
      this.#usuarios[index] = nuevoUsu
      await this.#escribirUsuarios()
      return nuevoUsu
    } else {
      throw new Error('error al actualizar: usuario no encontrado')
    }
  }

  async deleteUser(id) {
    await this.#leerUsuarios()
    const index = this.#usuarios.findIndex(u => u.id === id)
    if (index !== -1) {
      const arrayConLosBorrados = this.#usuarios.splice(index, 1)
      await this.#escribirUsuarios()
      return arrayConLosBorrados[0]
    } else {
      throw new Error('error al borrar: usuario no encontrado')
    }
  }
}

async function main() {
  const um = new UsuariosManager({ ruta: 'usuarios.json' })
  um.reset()

  console.log('agregado: ', await um.addUser({
    nombre: 'marian',
    apellido: 'profe',
    edad: 37,
    curso: '49980'
  }))

  console.log('agregado: ', await um.addUser({
    nombre: 'pepe',
    apellido: 'tutor',
    edad: 30,
    curso: '49980'
  }))

  console.log('obtenidos: ', await um.getUsers())

  console.log('actualizado: ', await um.updateUser(1, { edad: 38 }))
  console.log('borrado: ', await um.deleteUser(2))

  console.log('obtenidos: ', await um.getUsers())

  // otro manager apuntando al mismo archivo
  // deberia operar sobre los mismos usuarios!
  const otroUm = new UsuariosManager({ ruta: 'usuarios.json' })

  console.log('agregado otro: ', await otroUm.addUser({
    nombre: 'otro',
    apellido: 'profe',
    edad: 40,
    curso: '49980'
  }))

  console.log('obtenidos: ', await um.getUsers())
}

main()