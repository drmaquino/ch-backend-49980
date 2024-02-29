import { Router } from 'express'
import { appendJwtAsCookie, removeJwtFromCookies } from '../../middlewares/authentication.js'
import { usersOnly } from '../../middlewares/authorization.js'
import passport from 'passport'

export const sessionsRouter = Router()

// login
sessionsRouter.post('/',
  passport.authenticate('localLogin', {
    failWithError: true,
    session: false
  }),
  appendJwtAsCookie,
  async (req, res, next) => {
    res['successfullPost'](req.user)
  }
)

// view
sessionsRouter.get('/current',
  passport.authenticate('jwtAuth', {
    session: false
  }),
  usersOnly,
  async (req, res, next) => {
    res['successfullGet'](req.user)
  })

// logout
sessionsRouter.delete('/current',
  removeJwtFromCookies,
  async (req, res, next) => {
    res['successfullDelete']()
  }
)

