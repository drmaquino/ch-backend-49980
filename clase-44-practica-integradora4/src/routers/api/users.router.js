import { Router } from 'express'
import { appendJwtAsCookie, authenticateWithJwt } from '../../middlewares/authentication.js'
import { adminsOnly, authorizeUsersOnly } from '../../middlewares/authorization.js'
import { getCurrentUser, registerUser } from '../../controllers/users.controller.js'

export const usersRouter = Router()

usersRouter.post('/',
  registerUser,
  appendJwtAsCookie,
  async (req, res, next) => {
    res['successfullPost'](req.user)
  })

usersRouter.get('/current',
  authenticateWithJwt,
  authorizeUsersOnly,
  async (req, res, next) => {
    res['successfullGet'](req.user)
  })

usersRouter.get('/',
  authenticateWithJwt,
  adminsOnly,
  getCurrentUser)

