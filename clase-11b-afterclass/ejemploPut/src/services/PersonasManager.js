import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import { Persona } from '../models/Persona.js'

export class PersonasManager {
  constructor(ruta) {
    this.ruta = ruta
  }

  async create(datosPersona) {
    datosPersona.id = randomUUID()
    const persona = new Persona(datosPersona)
    const personas = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    personas.push(persona.toPOJO())
    await fs.writeFile(this.ruta, JSON.stringify(personas, null, 2))
    return persona.toPOJO()
  }

  async findAll() {
    return JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
  }

  async findById(id) {
    const personas = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    const buscada = personas.find(p => p.id === id)
    if (!buscada) {
      throw new Error('id no encontrado')
    }
    return buscada
  }

  async updateById(id, newData) {
    const personas = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    const personaIndex = personas.findIndex(p => p.id === id)
    if (personaIndex === -1) {
      throw new Error('id no encontrado')
    }

    const buscada = new Persona(personas[personaIndex])
    const nuevaPersona = buscada.con(newData)

    personas[personaIndex] = nuevaPersona.toPOJO()
    await fs.writeFile(this.ruta, JSON.stringify(personas, null, 2))

    return nuevaPersona.toPOJO()
  }

  async deleteById(id) {
    const personas = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    const personaIndex = personas.findIndex(p => p.id === id)
    if (personaIndex === -1) {
      throw new Error('id no encontrado')
    }
    const [borrada] = personas.splice(personaIndex, 1)
    await fs.writeFile(this.ruta, JSON.stringify(personas, null, 2))
    return borrada
  }
}

export const personasManager = new PersonasManager('./db/personas.json')