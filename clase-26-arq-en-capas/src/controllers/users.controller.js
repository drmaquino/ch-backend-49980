// RUTEO

import { User } from '../models/User.model.js'

// lo unico que hace es recibir peticiones y responderlas.
// PERO NO SE ENCARGA DE PROCESAR LOS PEDIDOS, LOS DELEGA SIEMPRE

export async function postController(req, res, next) {
  const userData = req.body
  if (req.file) {
    userData.foto = req.file.path
  }
  const user = await User.registrar(userData)
  res.status(201).json(user)
}

export async function getController(req, res, next) {
  const query = req.query
  const users = await User.listar(query)
  res.json(users)
}