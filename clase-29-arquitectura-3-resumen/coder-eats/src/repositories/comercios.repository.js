import { comerciosDaoMongoose } from '../daos/comercios.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

class ComerciosRepository extends GenericRepository {
  constructor(dao) { super(dao) }

  readOne(criteria, { populateProductos } = { populateProductos: false }) {
    if (populateProductos) {
      return this.dao.readOnePopulated(criteria)
    } else {
      return this.dao.readOne(criteria)
    }
  }

  readMany(criteria, { populateProductos } = { populateProductos: false }) {
    if (populateProductos) {
      return this.dao.readManyPopulated(criteria)
    } else {
      return this.dao.readMany(criteria)
    }
  }

}


export const comerciosRepository = new ComerciosRepository(comerciosDaoMongoose)