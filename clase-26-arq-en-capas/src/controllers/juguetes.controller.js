// RUTEO

import { Juguete } from '../models/Juguete.model.js'

// lo unico que hace es recibir peticiones y responderlas.
// PERO NO SE ENCARGA DE PROCESAR LOS PEDIDOS, LOS DELEGA SIEMPRE

export async function postController(req, res, next) {
  const jugueteData = req.body
  if (req.file) {
    jugueteData.foto = req.file.path
  }
  const juguete = await Juguete.cargar(jugueteData)
  res.status(201).json(juguete)
}

export async function getController(req, res, next) {
  const query = req.query
  const juguetes = await Juguete.listar(query)
  res.json(juguetes)
}

export async function deleteController(req, res, next) {
  const query = req.query
  await Juguete.eliminar(query)
  res.sendStatus(204)
}