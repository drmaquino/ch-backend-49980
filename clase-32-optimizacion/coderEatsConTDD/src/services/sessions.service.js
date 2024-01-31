import { usersDao } from '../daos/index.js'
import { AuthenticationError } from '../models/errors/authentication.error.js'

export class SessionsService {
  constructor(dao) {
    this.dao = dao
  }

  async login({ email, password }) {
    if (!email) {
      throw new AuthenticationError()
    }

    if (!password) {
      throw new AuthenticationError()
    }

    let user
    try {
      user = await this.dao.readOne({ email })
    } catch (error) {
      throw new AuthenticationError()
    }

    if (user.password !== password) {
      throw new AuthenticationError()
    }
    return {
      email
    }
  }
}

export const sessionsService = new SessionsService(usersDao)