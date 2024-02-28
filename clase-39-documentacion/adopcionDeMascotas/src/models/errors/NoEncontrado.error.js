import { CustomError } from './CustomError.js'

export class ErrorNoEncontrado extends CustomError {
  constructor(contexto) {
    super('NO ENCONTRADO', contexto)
  }
}