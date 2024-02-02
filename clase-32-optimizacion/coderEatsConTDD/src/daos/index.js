import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../config/config.js'

import { BusinessesDao } from './businesses.dao.js'
import { OrdersDao } from './orders.dao.js'
import { UsersDao } from './users.dao.js'

await mongoose.connect(MONGODB_CNX_STR)

export const businessesDao = new BusinessesDao()
export const ordersDao = new OrdersDao()
export const usersDao = new UsersDao()
