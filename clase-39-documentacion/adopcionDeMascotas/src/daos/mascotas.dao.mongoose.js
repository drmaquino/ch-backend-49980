import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const mascotasSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  especie: String,
  fechaNacimiento: Date,
  adoptada: Boolean,
  duenio: String,
  foto: String,
}, { versionKey: false })
const mascotasModel = mongoose.model('mascotas', mascotasSchema)

export const mascotasDaoMongoose = new DaoMongoose(mascotasModel)
