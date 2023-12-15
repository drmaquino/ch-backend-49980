import { Router } from 'express'
import { usuariosManager } from '../../models/User.js'
import { soloLogueadosWeb } from '../../middlewares/auth.js'
import { hashear } from '../../utils/criptografia.js'

export const usuariosRouter = Router()

// registro

usuariosRouter.get('/register', function registerView(req, res) {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

usuariosRouter.post('/register', async function registrarUsuario(req, res) {
  let creado
  try {
    // encripto password!
    req.body.password = hashear(req.body.password)
    creado = await usuariosManager.create(req.body)
  } catch (error) {
    console.log(error)
    return res.redirect('/register')
  }

  console.log(creado.toObject())

  const datosUsuario = {
    email: creado.email,
    nombre: creado.nombre,
    apellido: creado.apellido,
    rol: 'usuario'
  }

  req.login(datosUsuario, error => {
    if (error) {
      return res.redirect('/register')
    }
    res.redirect('/profile')
  })
})

// reestablecer contraseña

usuariosRouter.get('/resetpassword', function registerView(req, res) {
  res.render('resetpassword.handlebars', {
    pageTitle: 'Reestablecer contraseña'
  })
})

usuariosRouter.post('/resetpassword', async function registrarUsuario(req, res) {
  try {

    // encripto password!
    req.body.password = hashear(req.body.password)

    const actualizado = await usuariosManager.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: req.body.password } },
      { new: true }
    ).lean()

    if (!actualizado) {
      console.log('usuario no encontrado')
    } else {
      console.log(actualizado)
    }

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
    // user: req.session['user'],
    user: req.user,
  })
})
