import mongoose from 'mongoose'

const usuarios = [
  {
    nombre: 'blablabla'
  }
]

await mongoose.connect('mongodb://localhost/coderhouse')
console.log('connected!')
await mongoose.connection.db.collection('usuarios').insertMany(usuarios)
console.log('inserted!')
await mongoose.disconnect()
console.log('disconnected!')