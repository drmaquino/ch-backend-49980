import { businessDao } from '../daos/index.js'
import { Business } from '../models/Business.js'
import { NotFoundError } from '../models/errors/notFound.error.js'

export class BusinesssRepository {

  async save(order) {
    const businessDto = await businessDao.create(order.toPOJO())
    return new Business(businessDto)
  }

  async readOne(criteria) {
    const businessDto = await businessDao.readOne(criteria)
    if (!businessDto) throw new NotFoundError('orden')
    return new Business(businessDto)
  }

  async readMany(criteria) {
    const businessDtos = await businessDao.readMany(criteria)
    const business = businessDtos.map(dto => new Business(dto))
    return business
  }

  async updateOne(criteria, newBusiness) {
    const updatedDto = await businessDao.updateOne(criteria, newBusiness.toPOJO())
    if (!updatedDto) throw new NotFoundError('orden')
    return new Business(updatedDto)
  }

  updateMany(criteria, newBusiness) {
    return Promise.reject(new Error('NOT IMPLEMENTED: businessDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedDto = await businessDao.deleteOne(criteria)
    if (!deletedDto) throw new NotFoundError('orden')
    return new Business(deletedDto)
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: businessDao::deleteMany'))
  }
}

export const businessRepository = new BusinesssRepository()
