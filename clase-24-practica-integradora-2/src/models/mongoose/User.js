import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'
import { hasheadasSonIguales, hashear } from '../../utils/criptografia.js'

const schema = new Schema({
  _id: { type: String, default: randomUUID },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  displayName: { type: String, required: true },
  rol: { type: String, default: 'user' }
}, {
  versionKey: false,
  strict: 'throw',
  statics: {
    register: async (userData) => {
      userData.password = hashear(userData.password)
      const user = await model('users').create(userData)
      return user.toObject()
    },
    login: async ({ username, password }) => {
      const user = await model('users').findOne({ username })
      if (!user) { throw new Error('authentication error') }
      if (!hasheadasSonIguales({
        recibida: password,
        almacenada: user.password
      })) {
        throw new Error('authentication error')
      }
      return user.toObject()
    },

  }
})

export const usersManager = model('users', schema)