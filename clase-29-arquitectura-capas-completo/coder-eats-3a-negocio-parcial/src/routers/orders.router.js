import { Router } from 'express'
import {
  handleGet,
  handlePost,
} from '../controllers/orders.controller.js'

export const ordersRouter = Router()

ordersRouter.get('/:id?', handleGet)
ordersRouter.post('/', handlePost)
