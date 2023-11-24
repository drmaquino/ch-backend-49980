import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const esquemaGatito = new Schema({
  _id: { type: String, default: randomUUID(), require: true },
  nombre: { type: String, required: true },
  raza: { type: String, required: true },
  color: { type: String, required: true },
  fotoUrl: { type: String, default: 'static/images/gatito.png' }
}, {
  strict: 'throw',
  versionKey: false
})

export const Gatito = model('gatitos', esquemaGatito)