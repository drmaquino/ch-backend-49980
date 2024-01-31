import { emailService } from './email/email.service.js'
import { smsService } from './sms/sms.service.js'
import { Order } from '../models/Order.js'
import { ordersRepository } from '../repositories/orders.repository.js'
import { ADMIN_NUMBER } from '../config/config.js'
import { businessRepository } from '../repositories/business.repository.js'
import { usersRepository } from '../repositories/users.repository.js'

class OrdersService {

  async readOne(id) {
    const order = await ordersRepository.readOne({ _id: id })
    return order.toPOJO()
  }

  async readMany(query) {
    const orders = await ordersRepository.readMany(query)
    return orders.map(order => order.toPOJO())
  }

  async create({ userId, businessId, products }) {
    const user = await usersRepository.readOne({ _id: userId })
    const business = await businessRepository.readOne({ _id: businessId })

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

    const order = new Order({
      business: businessId,
      user: userId,
      products,
      totalPrice
    })

    await ordersRepository.save(order)

    user.addOrder(order._id)
    await usersRepository.updateOne({ _id: userId }, user)

    await emailService.send(
      user.email,
      'pedido recibido',
      `
Le informamos que su orden ha sido registrada con éxito.
Nro de ticket: ${order.number}`
    )

    await smsService.send(ADMIN_NUMBER, 'nuevo pedido!!')

    return order.toPOJO()
  }

  async resolve(_id, status = 'completed') {
    const order = await ordersRepository.readOne({ _id })

    switch (status) {
      case 'completed':
        order.complete()
        break
      case 'cancelled':
        order.cancel()
        break
      default:
        throw new Error('INVALID_STATUS')
    }

    await ordersRepository.updateOne({ _id }, order)

    let estado = status === 'cancelled' ? 'cancelada' : 'completada'
    await emailService.send(
      order.user.email,
      'orden ' + estado,
      `
Le informamos que su compra ha sido ${estado} con éxito.`
    )

    return order.toPOJO()
  }
}

export const ordersService = new OrdersService()