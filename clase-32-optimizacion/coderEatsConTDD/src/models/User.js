import { generateUUID } from '../utils/utils.js'

export class User {
  #_id
  #name
  #email
  #password
  #role
  #orders

  constructor({
    _id = generateUUID(),
    name,
    email,
    password,
    role,
    orders = [],
  }) {
    this.#_id = _id
    this.name = name
    this.email = email
    this.#password = password
    this.role = role
    this.#orders = orders
  }

  get _id() { return this.#_id }
  get name() { return this.#name }
  get email() { return this.#email }
  get role() { return this.#role }
  get orders() { return this.#orders }

  set name(value) {
    if (!value) {
      throw new Error('MISSING_REQUIRED_PARAM')
    }
    this.#name = value
  }

  set email(value) {
    if (!value) {
      throw new Error('MISSING_REQUIRED_PARAM')
    }
    this.#email = value
  }

  set role(value) {
    if (!value) {
      throw new Error('MISSING_REQUIRED_PARAM')
    }
    this.#role = value
  }

  set orders(value) {
    if (!value) {
      throw new Error('MISSING_REQUIRED_PARAM')
    }
    this.#orders = value
  }

  addOrder(order) {
    if (!order) {
      throw new Error('cannot add order. order is undefined')
    }
    this.#orders.push(order)
  }

  isValidPassword(password) { return password === this.#password }

  toPOJO() {
    return {
      _id: this.#_id,
      name: this.#name,
      email: this.#email,
      role: this.#role,
      orders: this.#orders,
    }
  }
}



