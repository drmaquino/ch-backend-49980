import { mascotasDaoMongoose } from '../daos/mascotas.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const mascotasRepository = new GenericRepository(mascotasDaoMongoose)