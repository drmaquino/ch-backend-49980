import { Router } from 'express'
import { usersManager } from '../../models/index.js'
import { appendJwtAsCookie } from '../../middlewares/authentication.js'
import { adminsOnly, usersOnly } from '../../middlewares/authorization.js'
import passport from 'passport'

export const usersRouter = Router()

usersRouter.post('/',
  passport.authenticate('localRegister', {
    failWithError: true,
    session: false
  }),
  appendJwtAsCookie,
  async (req, res, next) => {
    res['successfullPost'](req.user)
  })

usersRouter.get('/current',
  passport.authenticate('jwtAuth', {
    failWithError: true,
    session: false
  }),
  usersOnly,
  async (req, res, next) => {
    res['successfullGet'](req.user)
  })

usersRouter.get('/',
  passport.authenticate('jwtAuth', {
    failWithError: true,
    session: false,
  }),
  adminsOnly,
  async (req, res, next) => {
    const usuarios = await usersManager.find({}, { password: 0 }).lean()
    res['successfullGet'](usuarios)
  })

