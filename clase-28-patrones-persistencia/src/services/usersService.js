import { randomUUID } from 'crypto'
import { usersDao } from '../daos/users.dao.js'

function validar(obj) {
  if (!obj.nombre) throw new Error('missing param: nombre')
  if (!obj.edad) throw new Error('missing param: edad')
  if (obj.edad < 0) throw new Error('invalid param: negative')
  return obj
}

class UsersService {
  async registrar(userData) {
    userData._id = randomUUID() // negocio
    validar(userData) // negocio
    const guardado = await usersDao.guardar(userData) // persistencia
    return guardado
  }
}

export const usersService = new UsersService()