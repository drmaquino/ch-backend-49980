import { Schema, model } from 'mongoose'
import { generateUUID } from '../utils/utils.js'

const ProdInBusinessSchema = new Schema({
  _id: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
})

const businessSchema = new Schema({
  _id: { type: String, default: generateUUID },
  name: { type: String, required: true },
  products: [ProdInBusinessSchema],
}, {
  strict: 'throw',
  versionKey: false,
  methods: {
    toPOJO() {
      return {
        _id: this._id,
        name: this.name,
        products: this.products,
      }
    }
  }
})

const businessesModel = model('business', businessSchema)

//---------------------------------------------------

export class BusinessesDao {

  async create(element) {
    const business = await businessesModel.create(element)
    return business.toPOJO()
  }

  async readOne(criteria) {
    const business = await businessesModel.findOne(criteria)
    if (!business) return null
    return business.toPOJO()
  }

  async readMany(criteria) {
    const businesses = await businessesModel.find(criteria)
    return businesses.map(business => business.toPOJO())
  }

  async updateOne(criteria, newData) {
    const modifiedBusiness = await businessesModel
      .findOneAndUpdate(criteria, newData, { new: true })

    if (!modifiedBusiness) return null
    return modifiedBusiness.toPOJO()
  }

  updateMany(criteria, newData) {
    return Promise.reject(new Error('NOT IMPLEMENTED: businessDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedBusiness = await businessesModel
      .findOneAndDelete(criteria)
    if (!deletedBusiness) return null
    return deletedBusiness.toPOJO()
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: businessDao::deleteMany'))
  }
}
