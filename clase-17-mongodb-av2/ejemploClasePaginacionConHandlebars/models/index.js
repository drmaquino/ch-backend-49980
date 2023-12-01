import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost/coderhouse')

export { User } from './User.js'