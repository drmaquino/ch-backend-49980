import { Router } from 'express'
import passport from 'passport'

export const sesionesRouter = Router()

// login

// local

sesionesRouter.get('/login', function loginView(req, res) {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})

sesionesRouter.post('/login',
  passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  })
)

//github

sesionesRouter.get('/githublogin',
  passport.authenticate('github', { scope: ['user:email'] })
)

sesionesRouter.get('/githubcallback',
  passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  })
)

// logout

sesionesRouter.post('/logout', (req, res) => {
  req.logout(error => {
    if (error) {
      console.log(error)
    }
    res.redirect('/login')
  })
})




