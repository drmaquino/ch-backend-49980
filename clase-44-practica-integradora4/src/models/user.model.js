import { randomUUID } from 'node:crypto'

export class User {

  #username
  #password
  #email
  #displayName

  constructor({
    _id = randomUUID(),
    username,
    password,
    email,
    displayName,
    rol = 'user'
  }) {
    this._id = _id
    this.username = username
    this.password = password
    this.email = email
    this.displayName = displayName
    this.rol = rol
  }

  get username() { return this.#username }
  get password() { return this.#password }
  get email() { return this.#email }
  get displayName() { return this.#displayName }

  set username(value) {
    if (!value) {
      throw new Error('invalid argument')
    }
    this.#username = value
  }

  set password(value) {
    if (!value) {
      throw new Error('invalid argument')
    }
    this.#password = value
  }

  set email(value) {
    if (!value) {
      throw new Error('invalid argument')
    }
    this.#email = value
  }

  set displayName(value) {
    if (!value) {
      throw new Error('invalid argument')
    }
    this.#displayName = value
  }


  toPOJO() {
    return {
      _id: this._id,
      username: this.username,
      password: this.password,
      email: this.email,
      displayName: this.displayName,
      rol: this.rol,
    }
  }
}
