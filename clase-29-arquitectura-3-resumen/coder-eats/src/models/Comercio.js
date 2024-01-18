import { newId } from '../utils/id.js'

export class Comercio {
  #id
  #nombre
  #productos
  constructor({
    id = newId(),
    nombre,
    productos,
  }) {
    this.#id = id
    this.#nombre = nombre
    this.#productos = productos
  }

  dto() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      productos: this.#productos,
    }
  }
}