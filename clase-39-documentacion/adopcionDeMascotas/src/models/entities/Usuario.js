import { Id } from '../Id.js'

export class Usuario {
  constructor({ id = new Id(), nombre, apellido, email, password, rol = 'user', mascotas = [] }) {
    this.id = id
    this.nombre = nombre
    this.apellido = apellido
    this.email = email
    this.password = password
    this.rol = rol
    this.mascotas = mascotas
  }
}
