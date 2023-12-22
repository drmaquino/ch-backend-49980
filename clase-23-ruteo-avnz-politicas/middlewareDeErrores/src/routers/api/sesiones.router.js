import { Router } from 'express'
import passport from 'passport'

import { appendJwtAsCookie, removeJwtFromCookies } from '../../middlewares/passport.js'

export const sesionesRouter = Router()

sesionesRouter.post('/',
  passport.authenticate('local-login', { failWithError: true }),
  appendJwtAsCookie, // new
  async function (req, res) {
    res['successfullPost'](req.user)
  }
)

sesionesRouter.get('/current',
  passport.authenticate('jwt', { failWithError: true }),
  function (req, res) {
    res['successfullGet'](req.user)
  },
)

sesionesRouter.delete('/current',
  removeJwtFromCookies,
  (req, res) => {
    res['successfullLogout']()
  }
)

//TODO: revisar que responda rest
sesionesRouter.get('/githubcallback',
  passport.authenticate('github-login', { failWithError: true }),
  appendJwtAsCookie,
  (req, res) => { res.redirect('/profile') },
  (error, req, res, next) => { res.redirect('/login') }
)
