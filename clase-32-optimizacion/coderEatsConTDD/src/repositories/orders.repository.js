import { ordersDao } from '../daos/index.js'
import { Order } from '../models/Order.js'
import { NotFoundError } from '../models/errors/notFound.error.js'

export class OrdersRepository {

  async save(order) {
    const orderDto = await ordersDao.create(order.toPOJO())
    return new Order(orderDto)
  }

  async readOne(criteria) {
    const orderDto = await ordersDao.readOne(criteria)
    if (!orderDto) throw new NotFoundError('orden')
    return new Order(orderDto)
  }

  async readMany(criteria) {
    const ordersDtos = await ordersDao.readMany(criteria)
    const orders = ordersDtos.map(dto => new Order(dto))
    return orders
  }

  async updateOne(criteria, newOrder) {
    const updatedDto = await ordersDao.updateOne(criteria, newOrder.toPOJO())
    if (!updatedDto) throw new NotFoundError('orden')
    return new Order(updatedDto)
  }

  updateMany(criteria, newOrder) {
    return Promise.reject(new Error('NOT IMPLEMENTED: ordersDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedDto = await ordersDao.deleteOne(criteria)
    if (!deletedDto) throw new NotFoundError('orden')
    return new Order(deletedDto)
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: ordersDao::deleteMany'))
  }
}

export const ordersRepository = new OrdersRepository()
