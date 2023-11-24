import { Schema, model } from 'mongoose'

const propiedadSchema = new Schema({
  _id: { type: String, required: true },
  direccion: { type: String, required: true },
  cantAmbientes: { type: Number, required: true },
  imagenes: [{ type: String, required: true }]
}, {
  strict: 'throw',
  versionKey: false,
  statics: {},
  methods: {}
})

export const dbPropiedades = model('propiedades', propiedadSchema)
