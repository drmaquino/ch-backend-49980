import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const adopcionesSchema = new mongoose.Schema({
  id: String,
  idDuenio: String,
  idMascota: String,
}, { versionKey: false })
const adopcionesModel = mongoose.model('adopciones', adopcionesSchema)

export const adopcionesDaoMongoose = new DaoMongoose(adopcionesModel)
