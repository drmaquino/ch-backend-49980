import { usersDaoMongoose } from '../daos/mongoose/users.dao.mongoose.js'
import { User } from '../models/user.model.js'

export class UsersRepository {
  constructor({ usersDao }) {
    this.usersDao = usersDao
  }

  async save(user) {
    const found = await this.usersDao.readOne({ _id: user._id })
    if (found) {
      await this.usersDao.updateOne({ _id: user._id }, user.toPOJO())
    } else {
      await this.usersDao.createOne(user.toPOJO())
    }
  }

  async findOne(query) {
    const dto = await this.usersDao.readOne(query)
    if (!dto) throw new Error('not found')
    return new User(dto)
  }

  async findMany() {

  }

  async deleteOne() {

  }

  async deleteMany() {

  }
}

export const usersRepository = new UsersRepository({ usersDao: usersDaoMongoose })