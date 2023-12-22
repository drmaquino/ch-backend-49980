import { Router } from 'express'
import { soloLogueadosWeb } from '../../middlewares/auth.js'
import passport from 'passport'

export const webRouter = Router()

webRouter.get('/', (req, res) => { return res.redirect('/login') })

webRouter.get('/register', (req, res) => {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

webRouter.get('/resetpassword', (req, res) => {
  res.render('resetpassword.handlebars', {
    pageTitle: 'Reestablecer contraseña'
  })
})

webRouter.get('/profile', soloLogueadosWeb, (req, res) => {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    user: req.user,
  })
})

webRouter.get('/login', (req, res) => {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})

webRouter.get('/githublogin',
  passport.authenticate('github-login', { scope: ['user:email'] })
)
