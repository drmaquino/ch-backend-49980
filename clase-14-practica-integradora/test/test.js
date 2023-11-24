import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../src/config/mongodb.config.js'

import { propietariosManager } from '../src/services/propietarios.manager.js'
import { propiedadesManager } from '../src/services/propiedades.manager.js'

await mongoose.connect(MONGODB_CNX_STR)

await propietariosManager.registrar({
  nombre: 'marian',
  telefono: '12345',
  email: 'marian@mail.com',
})

console.log(await propietariosManager.consultar())

await propiedadesManager.registrar({
  direccion: 'aca 1234',
  cantAmbientes: 4,
})

console.log(await propiedadesManager.consultar())