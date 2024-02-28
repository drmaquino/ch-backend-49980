import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const usuariosSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  apellido: String,
  email: String,
  password: String,
  rol: String,
  mascotas: [String],
}, { versionKey: false })
const usuariosModel = mongoose.model('usuarios', usuariosSchema)

export const usuariosDaoMongoose = new DaoMongoose(usuariosModel)
