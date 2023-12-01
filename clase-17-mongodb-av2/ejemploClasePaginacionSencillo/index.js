import mongoose from 'mongoose'

import { User } from './models/users.js'

// cargo usuarios de prueba desde un json

// para la ultima version de node (18 en adelante)
import users from './users.json' assert { type: 'json' }

// para versiones de node 16 o anteriores
// import fs from 'fs/promises'
// const users = JSON.parse(await fs.readFile('./users.json', 'utf-8'))

// conecto el cliente a la base!
await mongoose.connect('mongodb://localhost/coderhouse')

// inserto los usuarios de prueba

await User.deleteMany({})
await User.insertMany(users)

const criterioDeBusqueda = { gender: 'Female' }

// const result = await User.find(criterioDeBusqueda)

const opcionesDePaginacion = { limit: 3, page: 3 }
// @ts-ignore
const result = await User.paginate(criterioDeBusqueda, opcionesDePaginacion)

console.log(result)

// limpio la base dsp de la prueba
await User.deleteMany({})

// cierro la cnx para que el programa finalice y libere la terminal
await mongoose.connection.close()