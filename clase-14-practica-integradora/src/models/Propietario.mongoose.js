import { Schema, model } from 'mongoose'

const propietarioSchema = new Schema({
  _id: { type: String, required: true },
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  propiedades: [{ type: String, required: true }],
}, {
  strict: 'throw',
  versionKey: false,
  statics: {},
  methods: {}
})

export const dbPropietarios = model('propietarios', propietarioSchema)
