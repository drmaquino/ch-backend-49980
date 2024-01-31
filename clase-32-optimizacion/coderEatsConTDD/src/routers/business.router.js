import { Router } from 'express'
import {
  handleGet,
  handlePost,
} from '../controllers/business.controller.js'

export const businessRouter = Router()

businessRouter.get('/:id?', handleGet)
businessRouter.post('/', handlePost)
