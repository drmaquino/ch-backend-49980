import { obligatorio, validarBooleano, validarPalabra } from '../validations/validaciones.js'

export class DatosCrearMascota {
  constructor({ nombre, especie, fechaNacimiento, adoptada, duenio, foto }) {
    try {
      obligatorio(nombre, 'nombre')
      validarPalabra(nombre, 'nombre')
      this.nombre = nombre

      obligatorio(especie, 'especie')
      validarPalabra(especie, 'especie')
      this.especie = especie

      obligatorio(fechaNacimiento, 'fechaNacimiento')
      validarPalabra(fechaNacimiento, 'fechaNacimiento')
      this.fechaNacimiento = new Date(fechaNacimiento)

      if (adoptada !== undefined) {
        validarBooleano(adoptada, 'adoptada')
        this.adoptada = adoptada
      }

      if (duenio !== undefined) {
        validarPalabra(duenio, 'duenio')
        this.duenio = duenio
      }

      if (foto !== undefined) {
        validarPalabra(foto, 'foto')
        this.foto = foto
      }
    } catch (error) {
      error
        .setRecurso('mascota')
        .setOperacion('registro')
      if (!error.descripcion) {
        error.setDescripcion(error.message)
      }
      throw error
    }
  }
}