import { Business } from '../models/Business.js'
import { businessesRepository } from '../repositories/businesses.repository.js'

class BusinessesService {

  async create(businessData) {
    const business = new Business(businessData)
    await businessesRepository.save(business)
    return business.toPOJO()
  }

  async readOne(id) {
    const business = await businessesRepository.readOne({ _id: id })
    return business.toPOJO()
  }

  async readMany(query) {
    const businesses = await businessesRepository.readMany(query)
    return businesses.map(business => business.toPOJO())
  }
}

export const businessesService = new BusinessesService()