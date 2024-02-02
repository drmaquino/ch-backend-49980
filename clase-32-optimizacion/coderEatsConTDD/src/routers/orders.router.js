import { Router } from 'express'
import {
  handleGet,
  handlePost,
  handlePut,
} from '../controllers/orders.controller.js'

export const ordersRouter = Router()

ordersRouter.get('/:id?', handleGet)
ordersRouter.post('/', handlePost)
ordersRouter.put('/:id', handlePut)
