import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../config/config.js'

export function connectDb() {
  return mongoose.connect(MONGODB_CNX_STR)
}

export function disconnectDb() {
  return mongoose.disconnect()
}