import { Router } from 'express'
import {
  handleGet,
  handlePost,
} from '../controllers/users.controller.js'

export const usersRouter = Router()

usersRouter.get('/:id?', handleGet)
usersRouter.post('/', handlePost)
