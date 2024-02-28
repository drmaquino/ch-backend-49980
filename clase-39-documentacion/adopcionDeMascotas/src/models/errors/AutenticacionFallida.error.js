import { CustomError } from './CustomError.js'

export class ErrorAutenticacionFallida extends CustomError {
  constructor(contexto = {
    recurso: 'sesiones',
    operacion: 'login',
    descripcion: 'credenciales invalidas',
  }) {
    super('ARGUMENTO INVALIDO', contexto)
  }
}