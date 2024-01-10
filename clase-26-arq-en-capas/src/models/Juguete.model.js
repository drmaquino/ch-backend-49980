import mongoose from 'mongoose'
import { randomUUID } from 'crypto'
import { DEFAULT_JUGUETE_FOTO } from '../config/config.js'

const collName = 'juguetes'

export const Juguete = mongoose.model(collName, new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true, min: 1 },
  stock: { type: Number, required: true, min: 0 },
  foto: { type: String, default: DEFAULT_JUGUETE_FOTO }
}, {
  versionKey: false, strict: 'throw',
  statics: {
    cargar: async (jugueteData) => {
      const user = await mongoose.model(collName).create(jugueteData)
      return user.toObject()
    },
    listar: async query => {
      return await mongoose.model(collName).find(query).lean()
    },
    eliminar: async query => {
      return await mongoose.model(collName).findOneAndDelete(query)
    }
  }
}))
