import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const comerciosSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  productos: [String]
}, {
  versionKey: false
})

const comerciosModel = mongoose.model('comercios', comerciosSchema)

class ComerciosDaoMongoose extends DaoMongoose {
  constructor(model) { super(model) }
  async readOnePopulated(criteria) {
    return await super.readOnePopulated(criteria, 'productos', 'productos', 'id')
  }
  async readManyPopulated(criteria) {
    return await super.readManyPopulated(criteria, 'productos', 'productos', 'id')
  }
}

export const comerciosDaoMongoose = new ComerciosDaoMongoose(comerciosModel)
