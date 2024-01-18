import crypto from 'crypto'

import { usersDao, businessDao, ordersDao } from '../daos/index.js'

// ProdsInBusiness {
//   _id: String,
//   price: Number,
//   description: String,
// }

// ProdsToOrderFromClient {
//   _id: String,
//   quantity: Number,
// }

// ProdsInOrder {
//   _id: String,
//   quantity: Number,
// }

class OrdersService {

  async readOne(id) {
    return await ordersDao.readOne({ _id: id })
  }

  async readMany(query) {
    return await ordersDao.readMany(query)
  }

  async create({ userId, businessId, products }) {
    const user = await usersDao.readOne({ _id: userId })
    if (!user) throw new Error('no existe el usuario')

    const business = await businessDao.readOne({ _id: businessId })
    if (!business) throw new Error('no existe el negocio')

    const prodsConPrecio = {}
    const prodIds = products.map(p => p._id)
    for (const pid of prodIds) {
      const p = business.products.find(p => p._id === pid)
      if (!p) throw new Error('el negocio no vende el producto con id ' + pid)
      prodsConPrecio[pid] = p.price
    }

    let totalPrice = 0
    for (const p of products) {
      const pricePerProd = prodsConPrecio[p._id] * p.quantity
      totalPrice += pricePerProd
    }

    const randomNumber = crypto.randomInt(1000, 9999)
    const orderNumber = Number(`${Date.now()}${randomNumber}`)

    const order = await ordersDao.create({
      number: orderNumber,
      business: businessId,
      user: userId,
      products,
      totalPrice
    })

    user.orders.push(order._id)
    await usersDao.updateOne({ _id: userId }, { $set: user })

    return order
  }

  async resolve(_id, status = 'completed') {
    return await ordersDao.updateOne(
      { _id },
      { status }
    )
  }
}

export const ordersService = new OrdersService()