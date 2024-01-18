import { newId } from '../utils/id.js'

export class Orden {
  #id
  #idUsuario
  #idComercio
  #productos
  #precio
  #estado

  static Estado = { PENDIENTE: 'pendiente', CANCELADA: 'cancelada', COMPLETADA: 'completada' }

  constructor({
    id = newId(),
    idUsuario,
    idComercio,
    productos,
    precio,
    estado = Orden.Estado.PENDIENTE,
  }) {
    this.#id = id
    this.#idUsuario = idUsuario
    this.#idComercio = idComercio
    this.#productos = productos
    this.#precio = precio
    this.estado = estado
  }

  set estado(value) {
    if (!Object.values(Orden.Estado).includes(value)) throw new Error('estado de orden invalido')
    this.#estado = value
  }

  dto() {
    return {
      id: this.#id,
      idUsuario: this.#idUsuario,
      idComercio: this.#idComercio,
      productos: this.#productos,
      precio: this.#precio,
      estado: this.#estado,
    }
  }
}