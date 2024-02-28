import { obligatorio, validarPalabra } from '../validations/validaciones.js'

export class DatosCrearUsuario {
  constructor({ nombre, apellido, email, password }) {
    try {
      obligatorio(nombre, 'nombre')
      validarPalabra(nombre, 'nombre')
      this.nombre = nombre

      obligatorio(apellido, 'apellido')
      validarPalabra(apellido, 'apellido')
      this.apellido = apellido

      obligatorio(email, 'email')
      validarPalabra(email, 'email')
      this.email = email

      obligatorio(password, 'password')
      validarPalabra(password, 'password')
      this.password = password
    } catch (error) {
      error
        .setRecurso('usuario')
        .setOperacion('registro')
      if (!error.descripcion) {
        error.setDescripcion(error.message)
      }
      throw error
    }
  }
}