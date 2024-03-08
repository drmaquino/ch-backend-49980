import { randomUUID } from 'crypto'
import { UserDto } from '../dto/user.dto.js'

export class User {
  #id: string
  #nombre: string
  #apellido: string
  #email: string
  #password: string
  #foto: string

  constructor({
    id = randomUUID(),
    nombre,
    apellido,
    email,
    password,
    foto = './static/foto_default.png'
  }) {
    this.#id = id
    this.nombre = nombre
    this.apellido = apellido
    this.email = email
    this.password = password
    this.foto = foto
  }

  get id() { return this.#id }
  get nombre() { return this.#nombre }
  get apellido() { return this.#apellido }
  get email() { return this.#email }
  get password() { return this.#password }
  get foto() { return this.#foto }

  set nombre(value) {
    if (!value) throw new Error('Invalid data. Missing "nombre"')
    this.#nombre = value
  }

  set apellido(value) {
    if (!value) throw new Error('Invalid data. Missing "apellido"')
    this.#apellido = value
  }

  set email(value) {
    if (!value) throw new Error('Invalid data. Missing "email"')
    this.#email = value
  }

  set password(value) {
    if (!value) throw new Error('Invalid data. Missing "password"')
    this.#password = value
  }

  set foto(value) {
    this.#foto = value
  }

  toPojo(): UserDto {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      password: this.password,
      foto: this.foto,
    }
  }

}
