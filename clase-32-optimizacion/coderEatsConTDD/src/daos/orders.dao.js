import { Schema, model } from 'mongoose'
import { generateUUID } from '../utils/utils.js'

const ordersSchema = new Schema({
  _id: { type: String, default: generateUUID },
  number: { type: Number, required: true },
  business: {
    type: String,
    ref: 'business',
    required: true
  },
  user: {
    type: String,
    ref: 'users',
    required: true
  },
  products: [],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  strict: 'throw',
  versionKey: false,
  methods: {
    toPOJO() {
      return {
        _id: this._id,
        number: this.number,
        business: this.business,
        user: this.user,
        products: this.products,
        totalPrice: this.totalPrice,
        status: this.status,
      }
    }
  }
})

const ordersModel = model('orders', ordersSchema)

//---------------------------------------------------

export class OrdersDao {

  async create(element) {
    const order = await ordersModel.create(element)
    return order.toPOJO()
  }

  async readOne(criteria) {
    const order = await ordersModel
      .findOne(criteria)
      .populate('business', 'name')
      .populate('user', 'name')

    if (!order) return null
    return order.toPOJO()
  }

  async readMany(criteria) {
    const orders = await ordersModel
      .find(criteria)
      .populate('business', 'name')
      .populate('user', 'name')

    const pojos = orders.map(order => order.toPOJO())
    return pojos
  }

  async updateOne(criteria, newData) {

    const modifiedOrder = await ordersModel
      .findOneAndUpdate(criteria, newData, { new: true, runValidators: true })
      .populate('business', 'name')
      .populate('user', 'name email')

    if (!modifiedOrder) return null
    return modifiedOrder.toPOJO()
  }

  updateMany(criteria, newData) {
    return Promise.reject(new Error('NOT IMPLEMENTED: ordersDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedOrder = await ordersModel
      .findOneAndDelete(criteria)
      .populate('business', 'name')
      .populate('user', 'name')

    if (!deletedOrder) return null
    return deletedOrder.toPOJO()
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: ordersDao::deleteMany'))
  }
}
