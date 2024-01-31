import { User } from '../models/User.js'
import { usersRepository } from '../repositories/users.repository.js'

class UsersService {

  async create(userData) {
    const user = new User(userData)
    await usersRepository.save(user)
    return user.toPOJO()
  }

  async readOne(id) {
    const user = await usersRepository.readOne({ _id: id })
    return user.toPOJO()
  }

  async readMany(query) {
    const users = await usersRepository.readMany(query)
    return users.map(user => user.toPOJO())
  }
}

export const usersService = new UsersService()