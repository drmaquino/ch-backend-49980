import { Schema, model } from 'mongoose'

const schema = new Schema({
  _id: { type: String },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  displayName: { type: String, required: true },
  rol: { type: String }
}, {
  versionKey: false,
  strict: 'throw',
  methods: {
    toPOJO: function () { return JSON.parse(JSON.stringify(this)) }
  },
  statics: {
    createOne: async function (userDto) {
      const doc = await model('users').create(userDto)
      return doc.toPOJO()
    },
    readOne: async function (query) {
      const doc = await model('users').findOne(query)
      if (!doc) return null
      return doc.toPOJO()
    },
    readMany: async function () {
      throw new Error('NOT IMPLEMENTED!')
    },
    updateOne: async function (query, newDocDto) {
      const doc = await model('users').findOneAndUpdate(query, { $set: newDocDto })
      if (!doc) return null
      return doc.toPOJO()
    },
    updateMany: async function () {
      throw new Error('NOT IMPLEMENTED!')
    },
    deleteOne: async function () {
      throw new Error('NOT IMPLEMENTED!')
    },
    deleteMany: async function () {
      throw new Error('NOT IMPLEMENTED!')
    },
  }
})

export const usersDaoMongoose = model('users', schema)