import { Schema, model } from 'mongoose'

const usersSchema = new Schema({
  name: String,
  email: String,
  role: String,
  orders: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'orders'
      }
    ],
    default: []
  }
}, { versionKey: false })

const usersModel = model('users', usersSchema)

//---------------------------------------------------

export class UsersDao {

  async create(element) {
    const user = await usersModel.create(element)
    return user.toObject()
  }

  async readOne(criteria) {
    const result = await usersModel.findOne(criteria).lean()
    if (!result) throw new Error('NOT FOUND')
    return result
  }

  async readMany(criteria) {
    return await usersModel.find(criteria).lean()
  }

  async updateOne(criteria, newData) {
    const modifiedUser = await usersModel
      .findOneAndUpdate(criteria, newData, { new: true })
      .lean()
    if (!modifiedUser) throw new Error('NOT FOUND')
    return modifiedUser
  }

  updateMany(criteria, newData) {
    return Promise.reject(new Error('NOT IMPLEMENTED: usersDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedUser = await usersModel
      .findOneAndDelete(criteria)
      .lean()
    if (!deletedUser) throw new Error('NOT FOUND')
    return deletedUser
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: usersDao::deleteMany'))
  }
}
