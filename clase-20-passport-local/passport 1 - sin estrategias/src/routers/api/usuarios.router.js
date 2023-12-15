import { Router } from 'express'
import { usuariosManager } from '../../models/User.js'
import { soloLogueadosApi } from '../../middlewares/auth.js'
import { hashear } from '../../utils/criptografia.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', async (req, res) => {
  let creado
  try {
    // encripto password!
    req.body.password = hashear(req.body.password)
    creado = await usuariosManager.create(req.body)
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message })
  }

  const datosUsuario = {
    email: creado.email,
    nombre: creado.nombre,
    apellido: creado.apellido,
    rol: 'usuario'
  }

  req.login(datosUsuario, error => {
    if (error) {
      throw new Error('login failed!')
    }
    res.status(201).json({ status: 'success', payload: creado })
  })

  // res.status(201).json({ status: 'success', payload: creado })
})

usuariosRouter.get('/current', soloLogueadosApi, async (req, res) => {
  const usuario = await usuariosManager.findOne({ email: req.session['user'].email }, { password: 0 }).lean()
  res.json({ status: 'success', payload: usuario })
})

usuariosRouter.put('/', async function (req, res) {
  try {

    // encripto password!
    req.body.password = hashear(req.body.password)

    const actualizado = await usuariosManager.updateOne(
      { email: req.body.email },
      { $set: { password: req.body.password } },
      { new: true }
    )

    if (!actualizado) {
      return res.status(404).json({ status: 'error', message: 'usuario no encontrado' })
    }

    res.status(201).json({ status: 'success', payload: actualizado })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
})