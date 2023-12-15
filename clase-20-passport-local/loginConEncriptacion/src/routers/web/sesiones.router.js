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
  try {
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
      const usuario = await usuariosManager.findOne({ email }).lean()

      if (!usuario) {
        console.log('usuario no encontrado')
        return res.redirect('/login')
      }

      console.log(usuario)

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

    req.session['user'] = datosUsuario
    res.redirect('/profile')
  } catch (error) {
    console.log(error)
    res.redirect('/login')
  }
})

// logout

sesionesRouter.post('/logout', (req, res) => {
  req.session.destroy(error => {
    if (error) {
      console.log(error)
    }
    res.redirect('/login')
  })
})




