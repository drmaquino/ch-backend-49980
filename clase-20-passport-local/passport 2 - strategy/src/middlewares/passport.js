import passport from 'passport'
import { Strategy } from 'passport-local'
import { usuariosManager } from '../models/User.js'

passport.use('register', new Strategy({
  passReqToCallback: true,
  usernameField: 'email'
},
  async (req, _u, _p, done) => {
    try {
      const datosUsuario = await usuariosManager.registrar(req.body)
      done(null, datosUsuario)
    } catch (error) {
      done(null, false, error.message)
    }
  }))

passport.use('login', new Strategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const datosUsuario = await usuariosManager.autenticar(email, password)
    done(null, datosUsuario)
  } catch (error) {
    return done(null, false, error.message)
  }
}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

const passportInitialize = passport.initialize()
const passportSession = passport.session()

export function autenticacion(req, res, next) {
  passportInitialize(req, res, () => {
    passportSession(req, res, next)
  })
}