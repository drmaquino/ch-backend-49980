import { Router } from 'express'
import {
  handleGet,
  handlePost,
} from '../controllers/businesses.controller.js'

export const businessesRouter = Router()

businessesRouter.get('/:id?', handleGet)
businessesRouter.post('/', handlePost)
