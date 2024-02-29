import { randomUUID } from 'node:crypto'

export class User {

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
