import mongoose from 'mongoose'
import { CNX_STR } from '../src/config/mongodb.config.js'

import { Producto } from '../src/models/Producto.js'
import { Comercio } from '../src/models/Comercio.js'
import { Usuario } from '../src/models/Usuario.js'

import { productosRepository } from '../src/repositories/productos.repository.js'
import { comerciosRepository } from '../src/repositories/comercios.repository.js'
import { usuariosRepository } from '../src/repositories/usuarios.repository.js'
import { ordenesRepository } from '../src/repositories/ordenes.repository.js'

import { ordenesService } from '../src/services/ordenes.service.js'

// mongoose.set('debug', true)

await mongoose.connect(CNX_STR)

// set up
await productosRepository.deleteMany({})
await comerciosRepository.deleteMany({})
await usuariosRepository.deleteMany({})
await ordenesRepository.deleteMany({})

const prod1 = await productosRepository.create(new Producto({ nombre: 'alfajor', precio: 100 }).dto())
const prod2 = await productosRepository.create(new Producto({ nombre: 'chupetin', precio: 50 }).dto())
console.log(prod1)
console.log(prod2)

const comercio = await comerciosRepository.create(new Comercio({ nombre: 'el jevi', productos: [prod1.id, prod2.id] }).dto())
console.log(comercio)

const usuario = await usuariosRepository.create(new Usuario({ nombre: 'pepe', email: 'pepe@mail.com' }).dto())
console.log(usuario)

// exercise

const orden = await ordenesService.create({
  idUsuario: usuario.id,
  idComercio: comercio.id,
  productos: [prod1.id, prod2.id]
})
console.log(orden)

const usuarioActualizado = await usuariosRepository.readOne({ id: orden.idUsuario })
console.log(usuarioActualizado)

const ordenCompletada = await ordenesService.completar(orden.id)
console.log(ordenCompletada)

// const ordenCancelada = await ordenesService.cancelar(orden.id)
// console.log(ordenCancelada)

// tear down
mongoose.disconnect()