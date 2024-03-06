import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { encriptar } from '../utils/criptografia.js'
import { JWT_PRIVATE_KEY } from '../config/config.js'
import { usersService } from '../services/users.service.js'
import { sessionsService } from '../services/sessions.service.js'


const COOKIE_OPTS = { signed: true, maxAge: 1000 * 60 * 60, httpOnly: true }

passport.use('localRegister', new LocalStrategy(
  { passReqToCallback: true },
  async (req, _username, _password, done) => {
    try {
      const user = await usersService.register(req.body)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
)

passport.use('localLogin', new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await sessionsService.authenticate({ username, password })
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
)

passport.use('jwtAuth', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
    let token = null
    if (req?.signedCookies) {
      token = req.signedCookies['authorization']
    }
    return token
  }]),
  secretOrKey: JWT_PRIVATE_KEY
}, (user, done) => {
  done(null, user)
}))

export async function appendJwtAsCookie(req, res, next) {
  try {
    const jwt = await encriptar(req.user)
    res.cookie('authorization', jwt, COOKIE_OPTS)
    next()
  } catch (error) {
    next(error)
  }
}

export async function removeJwtFromCookies(req, res, next) {
  res.clearCookie('authorization', COOKIE_OPTS)
  next()
}

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()


