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

sesionesRouter.post('/login', async (req, res) => {
  const { email, password } = req.body

  let datosUsuario

  if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    datosUsuario = {
      email: 'admin',
      nombre: 'admin',
      apellido: 'admin',
      rol: 'admin'
    }
  } else {
    let usuario
    try {
      usuario = await usuariosManager.findOne({ email }).lean()
    } catch (error) {
      // posible motivo de falla: error de la db!
      console.log(error)
      return res.redirect('/login')
    }

    if (!usuario) {
      console.log('usuario no encontrado')
      return res.redirect('/login')
    }

    if (!hasheadasSonIguales(password, usuario.password)) {
      console.log('las contraseñas no coinciden')
      return res.redirect('/login')
    }

    datosUsuario = {
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: 'usuario'
    }
  }

  if (!datosUsuario) {
    return res.redirect('/login')
  }

  req.login(datosUsuario, error => {
    if (error) {
      return res.redirect('/login')
    }
    res.redirect('/profile')
  })

})

// logout

sesionesRouter.post('/logout', (req, res) => {
  req.logout(error => {
    if (error) {
      console.log(error)
    }
    res.redirect('/login')
  })
})




