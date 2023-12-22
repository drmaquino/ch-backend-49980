import { Router } from 'express'
import passport from 'passport'

import { usuariosManager } from '../../models/User.js'
import { soloRoles } from '../../middlewares/auth.js'
import { appendJwtAsCookie } from '../../middlewares/passport.js'

export const usuariosRouter = Router()

usuariosRouter.post('/',
  passport.authenticate('local-register', { failWithError: true }),
  appendJwtAsCookie, // new
  async function (req, res) {
    res['successfullPost'](req.user)
  }
)

usuariosRouter.put('/', async function (req, res, next) {
  try {
    const actualizado = await usuariosManager.resetearContrasenia(req.body.email, req.body.password)
    res['successfullPut'](actualizado)
  } catch (error) {
    next(error)
  }
})

usuariosRouter.get('/current',
  passport.authenticate('jwt', { failWithError: true }),
  async (req, res) => {
    res['successfullGet'](req.user)
  }
)

usuariosRouter.get('/',
  passport.authenticate('jwt', { failWithError: true }),
  soloRoles(['admin']),
  async (req, res) => {
    const usuarios = await usuariosManager.find().lean()
    res['successfullGet'](usuarios)
  }
)
