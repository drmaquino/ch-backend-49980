import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { encriptar } from '../utils/criptografia.js'
import { JWT_PRIVATE_KEY } from '../config/config.js'


const COOKIE_OPTS = { signed: true, maxAge: 1000 * 60 * 60, httpOnly: true }

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

export const authenticateWithJwt = passport.authenticate('jwtAuth', {
  failWithError: true,
  session: false
})

export const authenticateWithCredentials = passport.authenticate('localLogin', {
  failWithError: true,
  session: false
})

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()