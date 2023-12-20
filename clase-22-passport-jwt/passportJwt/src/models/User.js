import mongoose from "mongoose"
import { randomUUID } from "node:crypto"
import { hasheadasSonIguales, hashear } from '../utils/criptografia.js'
import { isAdmin } from '../middlewares/auth.js'

const collection = 'usuarios'

const schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
}, {
  strict: 'throw',
  versionKey: false,
  methods: {
    infoPublica: function () {
      return {
        email: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
      }
    }
  },
  statics: {
    registrar: async function (reqBody) {
      reqBody.password = hashear(reqBody.password)
      const creado = await mongoose.model(collection).create(reqBody)

      const datosUsuario = {
        email: creado.email,
        nombre: creado.nombre,
        apellido: creado.apellido,
        rol: 'usuario'
      }

      return datosUsuario
    },
    autenticar: async function (username, password) {

      let datosUsuario

      if (isAdmin(username, password)) {
        datosUsuario = {
          email: 'admin',
          nombre: 'admin',
          apellido: 'admin',
          rol: 'admin'
        }
      } else {
        const usuario = await mongoose.model(collection).findOne({ email: username }).lean()

        if (!usuario) {
          throw new Error('usuario no encontrado')
        }

        if (!hasheadasSonIguales(password, usuario['password'])) {
          throw new Error('las contraseñas no coinciden')
        }

        datosUsuario = {
          email: usuario['email'],
          nombre: usuario['nombre'],
          apellido: usuario['apellido'],
          rol: 'usuario'
        }
      }

      if (!datosUsuario) {
        throw new Error('usuario no encontrado')
      }

      return datosUsuario
    },
    resetearContrasenia: async function (email, password) {
      const newPassword = hashear(password)

      const actualizado = await mongoose.model(collection).findOneAndUpdate(
        { email },
        { $set: { password: newPassword } },
        { new: true }
      ).lean()

      if (!actualizado) {
        throw new Error('usuario no encontrado')
      }

      return {
        email: actualizado['email'],
        nombre: actualizado['nombre'],
        apellido: actualizado['apellido'],
        rol: 'usuario'
      }
    }
  }
})

export const usuariosManager = mongoose.model(collection, schema)