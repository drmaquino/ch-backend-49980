import { TiposDeError } from './tiposDeError.js'

export class NotFoundError extends Error {
  constructor(nombreEntidad = 'elemento') {
    super('no se encontro: ' + nombreEntidad)
    this.type = TiposDeError.NOT_FOUND_ERROR
  }
}