import { User } from '../models/user.model.js'
import { hashear } from '../utils/criptografia.js'
import { usersRepository } from '../repositories/users.repository.js'
import { emailService } from './email/email.service.js'

export class UsersService {
  constructor({ usersRepository, emailService }) {
    this.usersRepository = usersRepository
    this.emailService = emailService
  }

  async register(userData) {
    const user = new User({
      ...userData,
      password: hashear(userData.password)
    })
    await this.usersRepository.save(user)
    await this.emailService.send(user.email, 'bienvenida', 'gracias por registrarte!')
    const pojo = user.toPOJO()
    return pojo
  }
}

export const usersService = new UsersService({ usersRepository, emailService })