import { Router } from 'express'
import { usuariosManager } from '../../models/User.js'
import { soloLogueadosWeb } from '../../middlewares/auth.js'

export const usuariosRouter = Router()

// registro

usuariosRouter.get('/register', function registerView(req, res) {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

usuariosRouter.post('/register',
  async function (req, res, next) {
    let datosUsuario
    try {
      datosUsuario = await usuariosManager.registrar(req.body)
    } catch (error) {
      return res.redirect('/register')
    }

    req.login(datosUsuario, error => {
      if (error) {
        return res.redirect('/register')
      }
      next()
    })
  },
  function (req, res) {
    res.redirect('/profile')
  }
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
