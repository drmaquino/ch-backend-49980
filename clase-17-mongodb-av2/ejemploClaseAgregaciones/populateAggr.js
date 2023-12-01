import mongoose from 'mongoose'
await mongoose.connect('mongodb://localhost/coderhouse')

const productSchema = new mongoose.Schema({
  _id: String,
  name: String
}, { versionKey: false })

const Product = mongoose.model('products', productSchema)

const products = [
  { "_id": "1", "name": "Product A" },
  { "_id": "2", "name": "Product B" },
  { "_id": "3", "name": "Product C" }
]

await Product.deleteMany({})
await Product.insertMany(products)

// ----------------------------------

const cartSchema = new mongoose.Schema({
  _id: String,
  products: [{ type: String, ref: 'products' }]
}, { versionKey: false })

const Cart = mongoose.model('carts', cartSchema)

const carts = [
  { "_id": "101", "products": ["1", "2"] },
  { "_id": "102", "products": ["2", "3"] }
]

await Cart.deleteMany({})
await Cart.insertMany(carts)

//------------------------

// await Cart.find().populate('products').lean()

// -----------------------

const result = await Cart.aggregate([
  {
    $lookup: {
      from: 'products',
      localField: 'products',
      foreignField: '_id',
      as: 'products',
    }
  }
])

console.log(JSON.stringify(result, null, 2))

await mongoose.disconnect()