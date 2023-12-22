import mongoose from 'mongoose'
import { Cart } from '../src/models/Cart.js'
import { Product } from '../src/models/Product.js'

await mongoose.connect('mongodb://localhost/coderhouse')

await Product.deleteMany({})
await Cart.deleteMany({})

const prod1 = await Product.create({ name: "Product A", price: 100 })
const prod2 = await Product.create({ name: "Product B", price: 200 })
const prod3 = await Product.create({ name: "Product C", price: 300 })

const cart1 = await Cart.create({})
const cart2 = await Cart.create({})

console.log(await Cart
  .find({}, { 'products._id': 0 })
  .lean())

await cart1.upsertProd(prod1._id, 6)
await cart1.upsertProd(prod2._id, 2)
await cart1.upsertProd(prod2._id, 4)
await cart1.upsertProd(prod3._id, 10)

// console.log(JSON.stringify(await Cart
//   .find({}, { 'products._id': 0 })
//   .lean(), null, 2))

const prodsPopulate = await Cart
  .find({}, { 'products._id': 0 })
  // lo saqué pq lo puse en el pre del esquema!
  // .populate('products.product')
  .lean()

console.log(JSON.stringify(prodsPopulate, null, 2))

await mongoose.disconnect()

