import { Router } from 'express'
import passport from 'passport'

import { soloLogueadosApi } from '../../middlewares/auth.js'

export const sesionesRouter = Router()

sesionesRouter.post('/',
  passport.authenticate('login', {
    failWithError: true
  }),
  function (req, res) {
    res.status(201).json({ status: 'success', payload: req.user })
  },
  function (error, req, res, next) {
    res
      .status(401)
      .json({
        status: 'error',
        message: 'login failed'
      })
  }
)

sesionesRouter.get('/current',
  soloLogueadosApi,
  function (req, res) {
    return res.json(req.user)
  })

sesionesRouter.delete('/current', (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ status: 'logout error', body: err })
    }
    res.json({ status: 'success', message: 'logout OK' })
  })
})
