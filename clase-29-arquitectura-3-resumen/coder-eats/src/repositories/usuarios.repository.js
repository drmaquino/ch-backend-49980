import { usuariosDaoMongoose } from '../daos/usuarios.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const usuariosRepository = new GenericRepository(usuariosDaoMongoose)