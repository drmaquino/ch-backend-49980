import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost/coderhouse')
console.log('conectado a mongodb!')

const userModelMongoose = mongoose.model('users', new mongoose.Schema({
  _id: { type: String },
  nombre: { type: String },
  edad: { type: Number }
}, {
  versionKey: false,
  strict: 'throw'
}))

export const usersMongooseDao = {
  guardar: async function (userData) {
    const user = await userModelMongoose.create(userData) // persistencia
    return user.toObject()
  }
}

