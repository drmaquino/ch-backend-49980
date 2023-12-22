import mongoose from 'mongoose'
import { randomUUID } from 'crypto'

const productSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  name: { type: String, required: true },
  price: { type: Number, min: 0, default: 0, required: true }
}, {
  strict: 'throw',
  versionKey: false
})

export const Product = mongoose.model('products', productSchema)
