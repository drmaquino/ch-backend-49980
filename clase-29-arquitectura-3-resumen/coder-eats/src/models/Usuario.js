import { newId } from '../utils/id.js'

export class Usuario {
  #id
  #nombre
  #email
  #rol
  #pedidos
  constructor({
    id = newId(),
    nombre,
    email,
    rol = 'user',
    pedidos = [],
  }) {
    this.#id = id
    this.#nombre = nombre
    this.#email = email
    this.rol = rol
    this.#pedidos = pedidos
  }

  set rol(value) {
    if (value !== 'admin' && value !== 'user') throw new Error('rol invalido')
    this.#rol = value
  }

  dto() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      email: this.#email,
      rol: this.#rol,
      pedidos: this.#pedidos,
    }
  }
}