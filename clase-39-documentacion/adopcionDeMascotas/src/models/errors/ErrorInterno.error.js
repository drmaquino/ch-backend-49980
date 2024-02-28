import { CustomError } from './CustomError.js'

export class ErrorInterno extends CustomError {
  constructor(contexto) {
    super('ERROR INTERNO', contexto)
  }
}