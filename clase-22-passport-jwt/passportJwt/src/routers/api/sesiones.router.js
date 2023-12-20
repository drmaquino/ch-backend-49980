import { Router } from 'express'
import passport from 'passport'

import { appendJwtAsCookie, removeJwtFromCookies } from '../../middlewares/passport.js'

export const sesionesRouter = Router()

sesionesRouter.post('/',
  passport.authenticate('local-login', { failWithError: true }),
  appendJwtAsCookie, // new
  async function (req, res) {
    res.status(201).json({ status: 'success', payload: req.user })
  },
  // el middleware de error lo moví al router de la api rest!
)

sesionesRouter.get('/current',
  passport.authenticate('jwt', { failWithError: true }),
  function (req, res) { return res.json(req.user) },
  // el middleware de error lo moví al router de la api rest!
)

sesionesRouter.delete('/current',
  removeJwtFromCookies,
  (req, res) => {
    res.json({ status: 'success', message: 'logout OK' })
  }
)

//TODO: revisar que responda rest
sesionesRouter.get('/githubcallback',
  passport.authenticate('github-login', {
    failWithError: true
  }),
  appendJwtAsCookie,
  (req, res) => { res.redirect('/profile') },
  (error, req, res, next) => { res.redirect('/login') }
)
