import { newId } from '../utils/id.js'

export class Producto {
  #id
  #nombre
  #precio
  constructor({
    id = newId(),
    nombre,
    precio,
  }) {
    this.#id = id
    this.#nombre = nombre
    this.#precio = precio
  }

  dto() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      precio: this.#precio,
    }
  }
}