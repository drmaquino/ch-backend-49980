import { Router } from 'express'
import { appendJwtAsCookie, authenticateWithCredentials, removeJwtFromCookies } from '../../middlewares/authentication.js'
import { authorizeUsersOnly } from '../../middlewares/authorization.js'
import passport from 'passport'
import { authenticateUser } from '../../controllers/users.controller.js'

export const sessionsRouter = Router()

// login
sessionsRouter.post('/',
  authenticateUser,
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
  authorizeUsersOnly,
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

