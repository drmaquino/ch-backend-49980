import mongoose from 'mongoose'
import { CNX_STR } from '../src/config/mongodb.config.js'
import { comerciosDaoMongoose } from '../src/daos/comercios.dao.mongoose.js'
import { productosDaoMongoose } from '../src/daos/productos.dao.mongoose.js'
import { Producto } from '../src/models/Producto.js'
import { Comercio } from '../src/models/Comercio.js'

// mongoose.set('debug', true)

await mongoose.connect(CNX_STR)

// set up
await productosDaoMongoose.deleteMany({})
await comerciosDaoMongoose.deleteMany({})

const prod1 = await productosDaoMongoose.create(new Producto({ nombre: 'alfajor', precio: 100 }).dto())
const prod2 = await productosDaoMongoose.create(new Producto({ nombre: 'chupetin', precio: 50 }).dto())
console.log(prod1)
console.log(prod2)

const comercio = await comerciosDaoMongoose.create(new Comercio({ nombre: 'el jevi', productos: [prod1.id, prod2.id] }).dto())
console.log(comercio)

// exercise

const buscado1 = await comerciosDaoMongoose.readOne({})
const buscados1 = await comerciosDaoMongoose.readMany({})
console.log(buscado1)
console.log(buscados1)

// import { inspect } from 'node:util'

// const buscado = await comerciosDaoMongoose.readOnePopulated({}, 'productos', 'productos', 'id')
// console.log(inspect(buscado, false, 10))

// const buscados = await comerciosDaoMongoose.readManyPopulated({}, 'productos', 'productos', 'id')
// console.log(inspect(buscados, false, 10))

// tear down
// await productosDaoMongoose.deleteMany({})
// await comerciosDaoMongoose.deleteMany({})

mongoose.disconnect()