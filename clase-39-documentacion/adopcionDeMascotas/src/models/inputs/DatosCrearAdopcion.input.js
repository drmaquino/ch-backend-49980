import { obligatorio, validarPalabra } from '../validations/validaciones.js'

export class DatosCrearAdopcion {
  constructor({ idUsuario, idMascota }) {
    try {
      obligatorio(idUsuario, 'idUsuario')
      validarPalabra(idUsuario, 'idUsuario')
      this.idUsuario = idUsuario

      obligatorio(idMascota, 'idMascota')
      validarPalabra(idMascota, 'idMascota')
      this.idMascota = idMascota
    } catch (error) {
      error
        .setRecurso('adopcion')
        .setOperacion('registro')
      if (!error.descripcion) {
        error.setDescripcion(error.message)
      }
      throw error
    }
  }
}