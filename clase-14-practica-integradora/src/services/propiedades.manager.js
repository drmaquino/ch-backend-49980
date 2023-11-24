import { randomUUID } from 'crypto'
import { dbPropiedades } from '../models/Propiedad.mongoose.js'
import { dbPropietarios } from '../models/Propietario.mongoose.js'

class PropiedadesManager {
  async cargar(idPropietario, datosPropiedad) {
    const propietario = await dbPropietarios.findById(idPropietario)
    if (!propietario) {
      throw new Error('no existe el propietario con ese id')
    }
    datosPropiedad._id = randomUUID()
    const propiedad = await dbPropiedades.create(datosPropiedad)

    await dbPropietarios.findByIdAndUpdate(idPropietario, {
      $push: { propiedades: datosPropiedad._id }
    })

    return propiedad.toObject()
  }
  async consultar() {
    return await dbPropiedades.find().lean()
  }
  async consultarUna(id) {
    return await dbPropiedades.findById(id).lean()
  }
}

export const propiedadesManager = new PropiedadesManager()