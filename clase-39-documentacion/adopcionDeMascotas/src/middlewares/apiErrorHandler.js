import { ErrorArgumentoInvalido } from '../models/errors/ArgumentoInvalido.error.js'
import { ErrorAutenticacionFallida } from '../models/errors/AutenticacionFallida.error.js'
import { ErrorNoEncontrado } from '../models/errors/NoEncontrado.error.js'
import { ErrorOperacionInvalida } from '../models/errors/OperacionInvalida.error.js'

export function apiErrorHandler(error, req, res, next) {
  const { recurso, operacion, descripcion } = error
  if (error instanceof ErrorArgumentoInvalido) {
    res.status(400)
  } else if (error instanceof ErrorAutenticacionFallida) {
    res.status(401)
  } else if (error instanceof ErrorNoEncontrado) {
    res.status(404)
  } else if (error instanceof ErrorOperacionInvalida) {
    res.status(409)
  } else {
    res.status(500)
  }
  res.json({ estado: 'error', recurso, operacion, descripcion })
}
