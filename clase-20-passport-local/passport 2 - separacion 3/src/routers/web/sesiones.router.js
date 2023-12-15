import { Router } from 'express'
import { usuariosManager } from '../../models/User.js'

export const sesionesRouter = Router()

// login

sesionesRouter.get('/login', function loginView(req, res) {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})

sesionesRouter.post('/login',
  async function (req, res, next) {
    const { email, password } = req.body

    let datosUsuario
    try {
      datosUsuario = await usuariosManager.autenticar(email, password)
    } catch (error) {
      return res.redirect('/login')
    }

    req.login(datosUsuario, error => {
      if (error) {
        return res.redirect('/login')
      }
      next()
    })
  },
  function (req, res) {
    res.redirect('/profile')
  }
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




