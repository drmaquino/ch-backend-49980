import fs from 'fs/promises'

export class PersonasManager {
  constructor(ruta) {
    this.ruta = ruta
  }

  async getAll(query = {}) {
    const json = await fs.readFile(this.ruta, 'utf-8')
    if (query.edad) {
      return JSON.parse(json).filter(p => p.edad === query.edad)
    }
    return JSON.parse(json)
  }

  async getById(id) {
    const json = await fs.readFile(this.ruta, 'utf-8')
    const personas = JSON.parse(json)
    const buscada = personas.find(p => p.id === id)
    if (!buscada) throw new Error(`no se encontró la persona con id ${id}`)
    return buscada
  }
}