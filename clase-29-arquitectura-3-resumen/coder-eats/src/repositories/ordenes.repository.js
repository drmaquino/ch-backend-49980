import { ordenesDaoMongoose } from '../daos/ordenes.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const ordenesRepository = new GenericRepository(ordenesDaoMongoose)