import { Schema, model } from 'mongoose'

const ordersSchema = new Schema({
  number: Number,
  business: {
    type: Schema.Types.ObjectId,
    ref: 'business'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  products: [],
  totalPrice: Number
}, { versionKey: false })

const ordersModel = model('orders', ordersSchema)

//---------------------------------------------------

export class OrdersDao {

  async create(element) {
    const order = await ordersModel.create(element)
    return order.toObject()
  }

  async readOne(criteria) {
    const result = await ordersModel.findOne(criteria)
    if (!result) throw new Error('NOT FOUND')
    return result
  }

  async readMany(criteria) {
    return await ordersModel.find(criteria).lean()
  }

  async updateOne(criteria, newData) {
    const modifiedUser = await ordersModel
      .findOneAndUpdate(criteria, newData, { new: true })
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
      .lean()
    if (!deletedUser) throw new Error('NOT FOUND')
    return deletedUser
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: ordersDao::deleteMany'))
  }
}
