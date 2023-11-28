import { dbPropietarios } from '../models/Propietario.mongoose.js'
import { randomUUID } from 'crypto'

class PropietariosManager {
  async registrar(datosPropietario) {
    datosPropietario._id = randomUUID()
    const propietario = await dbPropietarios.create(datosPropietario)
    return propietario.toObject()
  }
  async consultar() {
    return await dbPropietarios.find().lean()
  }
  async consultarUno(id) {
    return await dbPropietarios.findById(id).lean()
  }
}

export const propietariosManager = new PropietariosManager()