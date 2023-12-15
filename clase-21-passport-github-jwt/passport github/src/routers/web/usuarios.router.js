import { Router } from 'express'
import { usuariosManager } from '../../models/User.js'
import { soloLogueadosWeb } from '../../middlewares/auth.js'
import passport from 'passport'

export const usuariosRouter = Router()

// registro

usuariosRouter.get('/register', function registerView(req, res) {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

usuariosRouter.post('/register',
  passport.authenticate('register', {
    successRedirect: '/profile',
    failureRedirect: '/register',
  })
)

// reestablecer contraseña

usuariosRouter.get('/resetpassword', function registerView(req, res) {
  res.render('resetpassword.handlebars', {
    pageTitle: 'Reestablecer contraseña'
  })
})

usuariosRouter.post('/resetpassword', async function registrarUsuario(req, res) {
  try {
    await usuariosManager.resetearContrasenia(req.body.email, req.body.password)
    res.redirect('/login')
  } catch (error) {
    console.log(error)
    res.redirect('/resetpassword')
  }
})

// perfil

usuariosRouter.get('/profile', soloLogueadosWeb, function profileView(req, res) {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    user: req.user,
  })
})
