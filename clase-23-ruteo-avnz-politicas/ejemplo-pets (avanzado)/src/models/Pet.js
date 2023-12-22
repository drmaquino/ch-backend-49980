import mongoose from 'mongoose'
import { randomUUID } from 'crypto'

const petSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  name: {
    type: String,
    unique: true,
    required: [true, 'is required but missing']
  },
  species: {
    type: String,
    required: [true, 'is required but missing']
  },
  adopted: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  strict: 'throw',
})

petSchema.post('save', function (error, pet, next) {
  if (error.name === 'MongoServerError'
    && error.code === 11000) {
    throw new Error('ERROR_NOT_UNIQUE: ' + JSON.stringify(error.keyValue))
  }
  next()
})

petSchema.post(['find', 'findOne', 'findOneAndUpdate'], function (pets) {
  if (!pets) {
    throw new Error('ERROR_NOT_FOUND')
  }
})

export const petManager = mongoose.model('pets', petSchema)