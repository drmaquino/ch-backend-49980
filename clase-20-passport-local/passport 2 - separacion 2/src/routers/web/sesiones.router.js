import { Router } from 'express'
import { usuariosManager } from '../../models/User.js'
import { hasheadasSonIguales } from '../../utils/criptografia.js'

export const sesionesRouter = Router()

// login

sesionesRouter.get('/login', function loginView(req, res) {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})

async function autenticar(username, password) {

  let datosUsuario

  if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    datosUsuario = {
      email: 'admin',
      nombre: 'admin',
      apellido: 'admin',
      rol: 'admin'
    }
  } else {
    const usuario = await usuariosManager.findOne({ email: username }).lean()

    if (!usuario) {
      throw new Error('usuario no encontrado')
    }

    if (!hasheadasSonIguales(password, usuario.password)) {
      throw new Error('las contraseñas no coinciden')
    }

    datosUsuario = {
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: 'usuario'
    }
  }

  if (!datosUsuario) {
    throw new Error('usuario no encontrado')
  }

  return datosUsuario
}

sesionesRouter.post('/login',
  async function (req, res, next) {
    const { email, password } = req.body

    let datosUsuario
    try {
      datosUsuario = await autenticar(email, password)
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




