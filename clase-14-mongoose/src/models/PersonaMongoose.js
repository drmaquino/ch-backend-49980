import mongoose from 'mongoose'

const esquemaPersona = new mongoose.Schema({
  _id: { type: String, required: true },
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
}, {
  versionKey: false,
  strict: 'throw',
  methods: {
    saludar() {
      console.log('hola, me llamo ' + this.nombre + '!')
    }
  },
  statics: {
    async contar() {
      return await mongoose.model('personas').estimatedDocumentCount()
    }
  }
})

export const dbPersonas = mongoose.model('personas', esquemaPersona)
