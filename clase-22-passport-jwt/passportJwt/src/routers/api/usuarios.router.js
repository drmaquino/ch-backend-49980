import { Router } from 'express'
import passport from 'passport'

import { usuariosManager } from '../../models/User.js'
import { soloAdmins } from '../../middlewares/auth.js'
import { appendJwtAsCookie } from '../../middlewares/passport.js'

export const usuariosRouter = Router()

usuariosRouter.post('/',
  passport.authenticate('local-register', {
    failWithError: true,
  }),
  appendJwtAsCookie, // new
  async function (req, res) {
    res.status(201).json({ status: 'success', payload: req.user })
  },
  // el middleware de error lo moví al router de la api rest!
)

usuariosRouter.put('/', async function (req, res) {
  try {
    const actualizado = await usuariosManager.resetearContrasenia(req.body.email, req.body.password)
    res.json({ status: 'success', payload: actualizado })
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message })
  }
})

usuariosRouter.get('/current',
  passport.authenticate('jwt', { failWithError: true }),
  async (req, res) => {
    res.json({ status: 'success', payload: req.user })
  },
  // el middleware de error lo moví al router de la api rest!
)

usuariosRouter.get('/',
  passport.authenticate('jwt', { failWithError: true }),
  soloAdmins,
  async (req, res) => {
    const usuarios = await usuariosManager.find().lean()
    res.json({ status: 'success', payload: usuarios })
  },
  // el middleware de error lo moví al router de la api rest!
)
