import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const ordenesSchema = new mongoose.Schema({
  id: String,
  idUsuario: String,
  idComercio: String,
  productos: [String],
  precio: Number,
  estado: String,
}, { versionKey: false })
const ordenesModel = mongoose.model('ordenes', ordenesSchema)

export const ordenesDaoMongoose = new DaoMongoose(ordenesModel)