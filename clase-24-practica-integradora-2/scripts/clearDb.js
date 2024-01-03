import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../src/config/config.js'

await mongoose.connect(MONGODB_CNX_STR)
await mongoose.connection.dropDatabase()
await mongoose.disconnect()