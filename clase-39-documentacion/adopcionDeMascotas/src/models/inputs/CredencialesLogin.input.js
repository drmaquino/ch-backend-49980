import { obligatorio, validarPalabra } from '../validations/validaciones.js'

export class CredencialesLogin {
  constructor({ email, password }) {
    obligatorio(email, 'email')
    this.email = validarPalabra(email, 'email')

    obligatorio(password, 'password')
    this.password = validarPalabra(password, 'password')
  }
}