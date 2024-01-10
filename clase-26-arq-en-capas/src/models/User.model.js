import mongoose from 'mongoose'
import { randomUUID } from 'crypto'
import { DEFAULT_USER_FOTO } from '../config/config.js'

const collName = 'users'

export const User = mongoose.model(collName, new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  nombre: { type: String, required: true },
  foto: { type: String, default: DEFAULT_USER_FOTO },
  rol: { type: String, enum: ['user', 'admin'], default: 'user' },
}, {
  versionKey: false, strict: 'throw',
  statics: {
    registrar: async (userData) => {
      const user = await mongoose.model(collName).create(userData)
      return user.toObject()
    },
    listar: async query => {
      return await mongoose.model(collName).find(query).lean()
    }
  }
}))
