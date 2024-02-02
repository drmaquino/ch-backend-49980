import { businessesDao } from '../daos/index.js'
import { Business } from '../models/Business.js'
import { NotFoundError } from '../models/errors/notFound.error.js'

export class BusinessesRepository {

  async save(business) {
    await businessesDao.create(business.toPOJO())
  }

  async readOne(criteria) {
    const businessDto = await businessesDao.readOne(criteria)
    if (!businessDto) throw new NotFoundError('negocio')
    return new Business(businessDto)
  }

  async readMany(criteria) {
    const businessesDtos = await businessesDao.readMany(criteria)
    const businesses = businessesDtos.map(dto => new Business(dto))
    return businesses
  }

  async updateOne(criteria, newBusiness) {
    const updatedDto = await businessesDao.updateOne(criteria, newBusiness.toPOJO())
    if (!updatedDto) throw new NotFoundError('negocio')
    return new Business(updatedDto)
  }

  updateMany(criteria, newBusiness) {
    return Promise.reject(new Error('NOT IMPLEMENTED: businessesDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedDto = await businessesDao.deleteOne(criteria)
    if (!deletedDto) throw new NotFoundError('negocio')
    return new Business(deletedDto)
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: businessesDao::deleteMany'))
  }
}

export const businessesRepository = new BusinessesRepository()
