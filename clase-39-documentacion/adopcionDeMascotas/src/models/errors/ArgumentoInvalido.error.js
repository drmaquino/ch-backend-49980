import { CustomError } from './CustomError.js'

export class ErrorArgumentoInvalido extends CustomError {
  constructor(contexto) {
    super('ARGUMENTO INVALIDO', contexto)
  }
}