import { Router } from 'express'
import { mensajeManager } from '../services/MensajeManager.js'

export const apiRouter = Router()

apiRouter.post('/mensajes', async (req, res) => {
  await mensajeManager.agregar(req.body.mensaje)
  req['io'].sockets.emit('mensajes', await mensajeManager.obtenerTodos())
  res.json({ status: 'ok' })
})

