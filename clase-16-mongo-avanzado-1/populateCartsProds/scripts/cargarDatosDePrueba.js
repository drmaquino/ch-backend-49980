import mongoose from 'mongoose'

import { Cart } from '../src/models/Cart.js'
import { Product } from '../src/models/Product.js'

await mongoose.connect('mongodb://localhost/coderhouse')

await Product.deleteMany({})
await Cart.deleteMany({})

await Product.create({ name: "Product A", price: 100 })
await Product.create({ name: "Product B", price: 200 })
await Product.create({ name: "Product C", price: 300 })
await Product.create({ name: "Product D", price: 400 })
await Product.create({ name: "Product E", price: 500 })

await mongoose.disconnect()
