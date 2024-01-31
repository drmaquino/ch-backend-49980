import { TiposDeError } from './tiposDeError.js'

export class AuthenticationError extends Error {
  constructor() {
    super('error de autenticacion')
    this.type = TiposDeError.AUTH_ERROR
  }
}