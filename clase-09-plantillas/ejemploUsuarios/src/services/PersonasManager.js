import { Persona } from '../models/Persona.js'
import fs from 'fs/promises'

export class PersonasManager {
  constructor(ruta) {
    this.ruta = ruta
  }

  async agregar(datos) {
    const persona = new Persona(datos)
    const personas = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    personas.push(persona)
    await fs.writeFile(this.ruta, JSON.stringify(personas, null, 2))
    return persona
  }

  async obtenerTodas() {
    return JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
  }
}

export const personasManager = new PersonasManager('./db/personas.json')
