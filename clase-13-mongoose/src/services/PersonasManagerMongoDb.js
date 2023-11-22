import { randomUUID } from 'crypto'
import { dbPersonas } from '../models/PersonaMongoose.js'

export class PersonasManagerMongoDb {

  async create(datosPersona) {
    datosPersona._id = randomUUID()
    const persona = await dbPersonas.create(datosPersona)
    return persona.toObject()
  }

  async findAll() {
    return await dbPersonas.find().lean()
  }

  async findById(id) {
    const buscada = await dbPersonas.findById(id).lean()
    if (!buscada) {
      throw new Error('id no encontrado')
    }
    return buscada
  }

  async updateById(id, newData) {
    const modificada = await dbPersonas.findByIdAndUpdate(id,
      { $set: newData },
      { new: true })
      .lean()

    if (!modificada) {
      throw new Error('id no encontrado')
    }

    return modificada
  }

  async deleteById(id) {
    const borrada = await dbPersonas.findByIdAndDelete(id).lean()

    if (!borrada) {
      throw new Error('id no encontrado')
    }

    return borrada
  }
}
