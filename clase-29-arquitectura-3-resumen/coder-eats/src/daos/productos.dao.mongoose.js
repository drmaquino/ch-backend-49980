import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const productosSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  precio: Number,
}, { versionKey: false })
const productosModel = mongoose.model('productos', productosSchema)

export const productosDaoMongoose = new DaoMongoose(productosModel)