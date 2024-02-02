import { AuthenticationError } from '../models/errors/authentication.error.js'
import { usersRepository } from '../repositories/users.repository.js'

export class SessionsService {
  async login({ email, password }) {

    if (!email) {
      throw new AuthenticationError()
    }

    if (!password) {
      throw new AuthenticationError()
    }

    let user
    try {
      user = await usersRepository.readOne({ email })
    } catch (error) {
      throw new AuthenticationError()
    }

    if (!user.isValidPassword(password)) {
      throw new AuthenticationError()
    }

    return {
      email
    }
  }
}

export const sessionsService = new SessionsService()