import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'

import { usuariosManager } from '../models/User.js'

import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config.js'


passport.use('github', new GithubStrategy({
  clientID: githubClienteId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async function verify(accessToken, refreshToken, profile, done) {
  console.log(profile)

  const usuario = await usuariosManager.findOne({ email: profile.username })
  if (usuario) {
    return done(null, {
      ...usuario.infoPublica(),
      rol: 'usuario'
    })
  }

  try {
    const registrado = await usuariosManager.create({
      email: profile.username,
      password: '(sin especificar)',
      nombre: profile.displayName,
      apellido: '(sin especificar)',
    })
    done(null, {
      ...registrado.infoPublica(),
      rol: 'usuario'
    })
  } catch (error) {
    done(error)
  }

}))

passport.use('register', new LocalStrategy({
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

passport.use('login', new LocalStrategy({
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