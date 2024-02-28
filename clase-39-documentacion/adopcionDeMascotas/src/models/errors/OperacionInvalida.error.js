import { CustomError } from './CustomError.js'

export class ErrorOperacionInvalida extends CustomError {
  constructor(contexto) {
    super('OPERACION INVALIDA', contexto)
  }
}