import { Schema, model } from 'mongoose'
import { randomUUID } from 'node:crypto'

const ordersSchema = new Schema({
  _id: { type: String, default: randomUUID },
  number: Number,
  business: {
    type: String,
    ref: 'business'
  },
  user: {
    type: String,
    ref: 'users'
  },
  products: [],
  totalPrice: Number,
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
}, { strict: 'throw', versionKey: false })

// ordersSchema.pre('findOneAndUpdate', function (next) {
//   this.options.runValidators = true
//   next()
// })

const ordersModel = model('orders', ordersSchema)

//---------------------------------------------------

export class OrdersDao {

  async create(element) {
    const order = await ordersModel.create(element)
    return order.toObject()
  }

  async readOne(criteria) {
    const result = await ordersModel
      .findOne(criteria)
      .populate('business', 'name')
      .populate('user', 'name')
      .lean()

    if (!result) throw new Error('NOT FOUND')
    return result
  }

  async readMany(criteria) {
    return await ordersModel
      .find(criteria)
      .populate('business', 'name')
      .populate('user', 'name')
      .lean()
  }

  async updateOne(criteria, newData) {

    const modifiedUser = await ordersModel
      .findOneAndUpdate(criteria, newData, { new: true, runValidators: true })
      .populate('business', 'name')
      .populate('user', 'name')
      .lean()
    if (!modifiedUser) throw new Error('NOT FOUND')
    return modifiedUser
  }

  updateMany(criteria, newData) {
    return Promise.reject(new Error('NOT IMPLEMENTED: ordersDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedUser = await ordersModel
      .findOneAndDelete(criteria)
      .populate('business', 'name')
      .populate('user', 'name')
      .lean()
    if (!deletedUser) throw new Error('NOT FOUND')
    return deletedUser
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: ordersDao::deleteMany'))
  }
}
