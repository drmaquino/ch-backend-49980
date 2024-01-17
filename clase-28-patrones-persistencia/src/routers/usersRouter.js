import { Router } from 'express'
import { postController as registerUser } from '../controllers/usersController.js'

export const usersRouter = Router()

usersRouter.post('/',
  // autenticar,
  // autorizar,
  registerUser)
