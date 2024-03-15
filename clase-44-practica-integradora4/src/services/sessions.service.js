
import { hasheadasSonIguales } from '../utils/criptografia.js'
import { usersRepository } from '../repositories/users.repository.js'

export class SessionsService {
  constructor({ usersRepository }) {
    this.usersRepository = usersRepository
  }

  async authenticate({ username, password }) {
    let user
    try {
      user = await this.usersRepository.findOne({ username })
    } catch (error) {
      throw new Error('authentication error')
    }

    if (!hasheadasSonIguales({
      recibida: password,
      almacenada: user.password
    })) {
      throw new Error('authentication error')
    }

    return user.toPOJO()
  }
}

export const sessionsService = new SessionsService({ usersRepository })
