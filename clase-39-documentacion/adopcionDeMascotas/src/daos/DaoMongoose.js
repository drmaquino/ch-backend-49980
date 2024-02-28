import { ErrorNoEncontrado } from '../models/errors/NoEncontrado.error.js'

function toPojo(object) {
  return JSON.parse(
    JSON.stringify(
      object
    )
  )
}

export class DaoMongoose {
  #model
  constructor(mongooseModel) {
    this.#model = mongooseModel
  }

  async create(element) {
    const pojo = toPojo(await this.#model.create(element))
    delete pojo._id
    return pojo
  }

  async readOne(criteria) {
    const result = await this.#model.findOne(criteria).select({ _id: 0 }).lean()
    if (!result) throw new ErrorNoEncontrado()
    return result
  }

  async readMany(criteria) {
    const result = await this.#model.find(criteria).select({ _id: 0 }).lean()
    return result
  }

  async updateOne(criteria, newData) {
    const modifiedUser = await this.#model.findOneAndUpdate(criteria, newData, { new: true, projection: { _id: 0 } }).lean()
    if (!modifiedUser) throw new ErrorNoEncontrado()
    return modifiedUser
  }

  async updateMany(criteria, newData) {
    await this.#model.updateMany(criteria, newData)
  }

  async deleteOne(criteria) {
    const deletedUser = await this.#model.findOneAndDelete(criteria, { projection: { _id: 0 } }).lean()
    if (!deletedUser) throw new ErrorNoEncontrado()
    return deletedUser
  }

  async deleteMany(criteria) {
    await this.#model.deleteMany(criteria)
  }

  // POPULATIONS ----------------------------------------------------------

  async readOnePopulated(criteria, localField, from, foreignField) {
    const [result] = await this.#model.aggregate([
      { $match: criteria },
      { $limit: 1 },
      {
        $lookup: {
          from,
          localField,
          foreignField,
          as: localField,
          pipeline: [{ $project: { "_id": false } }],
        }
      },
      { $project: { "_id": false } }
    ])

    if (!result) throw new ErrorNoEncontrado()
    return result
  }

  async readManyPopulated(criteria, localField, from, foreignField) {
    const result = await this.#model.aggregate([
      { $match: criteria },
      {
        $lookup: {
          from,
          localField,
          foreignField,
          as: localField,
          pipeline: [{ $project: { "_id": false } }],
        }
      },
      { $project: { "_id": false } }
    ])
    return result
  }
}
