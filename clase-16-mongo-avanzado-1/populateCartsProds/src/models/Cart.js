import mongoose from 'mongoose'
import { randomUUID } from 'node:crypto'

const cartSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  products: {
    type: [
      {
        product: { type: String, ref: 'products' },
        quantity: { type: Number, min: 1, default: 1 }
      }
    ],
    default: []
  }
}, {
  versionKey: false,
  strict: 'throw',
  methods: {
    upsertProd: async function (prodId, quantity) {
      const prods = this.products.toObject()
      const prodIndex = prods.findIndex(p => p.product === prodId)
      if (prodIndex !== -1) {
        prods.splice(prodIndex, 1)
      }
      if (quantity > 0) {
        prods.push({
          product: prodId,
          quantity
        })
        this.products = prods
        await this.save()
      }
    }
  }
})

cartSchema.pre('find', function () {
  this.populate('products.product')
})

cartSchema.post('findOne', function (cart) {
  if (!cart) throw new Error('carrito no encontrado')
})

export const Cart = mongoose.model('carts', cartSchema)