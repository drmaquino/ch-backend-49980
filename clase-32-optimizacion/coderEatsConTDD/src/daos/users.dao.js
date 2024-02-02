import { Schema, model } from 'mongoose'
import { generateUUID } from '../utils/utils.js'

const usersSchema = new Schema({
  _id: { type: String, default: generateUUID },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  orders: {
    type: [
      {
        type: String,
        ref: 'orders',
        required: true
      }
    ],
    default: [String]
  }
}, {
  strict: 'throw',
  versionKey: false,
  methods: {
    toPOJO() {
      return {
        _id: this._id,
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
        orders: this.orders,
      }
    }
  }
})

const usersModel = model('users', usersSchema)

//---------------------------------------------------

export class UsersDao {

  async create(element) {
    const user = await usersModel.create(element)
    return user.toPOJO()
  }

  async readOne(criteria) {
    const user = await usersModel
      .findOne(criteria)
      .populate('orders')

    if (!user) return null
    return user.toPOJO()
  }

  async readMany(criteria) {
    const users = await usersModel
      .find(criteria)
      .populate('orders')

    return users.map(user => user.toPOJO())
  }

  async updateOne(criteria, newData) {
    const modifiedUser = await usersModel
      .findOneAndUpdate(criteria, newData, { new: true })
      .populate('orders')

    if (!modifiedUser) return null
    return modifiedUser.toPOJO()
  }

  updateMany(criteria, newData) {
    return Promise.reject(new Error('NOT IMPLEMENTED: usersDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedUser = await usersModel
      .findOneAndDelete(criteria)
      .populate('orders')

    if (!deletedUser) return null
    return deletedUser.toPOJO()
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: usersDao::deleteMany'))
  }
}
