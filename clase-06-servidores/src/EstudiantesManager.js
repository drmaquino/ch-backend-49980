import fs from 'fs/promises'

export class EstudiantesManager {
  constructor(path) {
    this.path = path
  }

  async #read() {
    this.estudiantes = JSON.parse(await fs.readFile(this.path, 'utf-8'))
  }

  async #write() {
    await fs.writeFile(this.path, JSON.stringify(this.estudiantes, null, 2))
  }

  async obtenerTodos() {
    await this.#read()
    return this.estudiantes
  }

  async obtenerSegunId(id) {
    await this.#read()
    return this.estudiantes.find(p => p.id === id)
  }
}