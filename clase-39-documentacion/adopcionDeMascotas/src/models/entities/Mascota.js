import { Id } from '../Id.js'

export class Mascota {
  constructor({ id = new Id(), nombre, especie, fechaNacimiento, adoptada = false, duenio = null, foto = null }) {
    this.id = id
    this.nombre = nombre
    this.especie = especie
    this.fechaNacimiento = fechaNacimiento
    this.adoptada = adoptada
    this.duenio = duenio
    this.foto = foto
  }
}
