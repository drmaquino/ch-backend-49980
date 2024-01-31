import { usersDao } from '../daos/index.js'
import { User } from '../models/User.js'
import { NotFoundError } from '../models/errors/notFound.error.js'

export class UsersRepository {

  async save(order) {
    const orderDto = await usersDao.create(order.toPOJO())
    return new User(orderDto)
  }

  async readOne(criteria) {
    const orderDto = await usersDao.readOne(criteria)
    if (!orderDto) throw new NotFoundError('usuario')
    return new User(orderDto)
  }

  async readMany(criteria) {
    const ordersDtos = await usersDao.readMany(criteria)
    const orders = ordersDtos.map(dto => new User(dto))
    return orders
  }

  async updateOne(criteria, newUser) {
    const updatedDto = await usersDao.updateOne(criteria, newUser.toPOJO())
    if (!updatedDto) throw new NotFoundError('usuario')
    return new User(updatedDto)
  }

  updateMany(criteria, newUser) {
    return Promise.reject(new Error('NOT IMPLEMENTED: usersDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedDto = await usersDao.deleteOne(criteria)
    if (!deletedDto) throw new NotFoundError('usuario')
    return new User(deletedDto)
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: usersDao::deleteMany'))
  }
}

export const usersRepository = new UsersRepository()
