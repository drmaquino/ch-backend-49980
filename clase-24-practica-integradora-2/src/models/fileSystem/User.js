import { randomUUID } from 'crypto'
import { promises as fs } from 'fs'

class User {

  constructor({
    username,
    password,
    email,
    displayName,
  }) {
    this._id = randomUUID()
    this.username = username
    this.password = password
    this.email = email
    this.displayName = displayName
  }

  static async find() { }
  static async findBy() { }
  static async findOne() { }
  static async updateOne() { }
  static async updateMany() { }
  static async deleteOne() { }
}

export const usersManager = User