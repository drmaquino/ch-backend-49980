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

async function registrar(reqBody) {
  reqBody.password = hashear(reqBody.password)
  const creado = await usuariosManager.create(reqBody)

  const datosUsuario = {
    email: creado.email,
    nombre: creado.nombre,
    apellido: creado.apellido,
    rol: 'usuario'
  }

  return datosUsuario
}

usuariosRouter.post('/register',
  async function (req, res, next) {
    let datosUsuario
    try {
      datosUsuario = await registrar(req.body)
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
    user: req.user,
  })
})
