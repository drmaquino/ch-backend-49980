import fs from 'fs/promises'

export class ProfesManager {
  constructor(path) {
    this.path = path
  }

  async #read() {
    this.profes = JSON.parse(await fs.readFile(this.path, 'utf-8'))
  }

  async #write() {
    await fs.writeFile(this.path, JSON.stringify(this.profes, null, 2))
  }

  async obtenerTodos() {
    await this.#read()
    return this.profes
  }

  async obtenerSegunRol(rol) {
    await this.#read()
    return this.profes.filter(p => p.rol === rol)
  }

  async obtenerSegunId(id) {
    await this.#read()
    return this.profes.find(p => p.id === id)
  }
}