import { adopcionesDaoMongoose } from '../daos/adopciones.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const adopcionesRepository = new GenericRepository(adopcionesDaoMongoose)