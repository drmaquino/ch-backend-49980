import passport from 'passport'
// import { Strategy } from 'passport-local'

// passport.use('register', new Strategy({
//     passReqToCallback: true,
//     // usernameField: 'email'
// },
//     async (req, _u, _p, done) => {
//         // esto es lo que estaba en el controller de registro
//         const { username, password, ...datosPersonales } = req.body

//         const user = new User({ username, password: hashear(password), ...datosPersonales })
//         await userManager.guardar(user)
//         done(null, {
//             username: user.username,
//             nombre: user.nombre,
//             apellido: user.apellido,
//             edad: user.edad,
//             direccion: user.direccion,
//         })
//     }))

// passport.use('login', new Strategy({ passReqToCallback: true }, async (req, _u, _p, done) => {
//     // esto es lo que estaba en el controller de login
//     const { username, password } = req.body
//     let buscado
//     try {
//         buscado = await userManager.buscarPorUsername(username)
//     } catch (error) {
//         return done(new ErrorDeAutenticacion())
//     }
//     if (!validarQueSeanIguales(password, buscado.password))
//         return done(new ErrorDeAutenticacion())
//     done(null, {
//         username: buscado.username,
//         nombre: buscado.nombre,
//         apellido: buscado.apellido,
//         edad: buscado.edad,
//         direccion: buscado.direccion,
//     })
// }))

// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

const passportInitialize = passport.initialize()
const passportSession = passport.session()

export function autenticacion(req, res, next) {
  passportInitialize(req, res, () => {
    passportSession(req, res, next)
  })
}