import { generateUUID, generateRandomNumber } from '../utils/utils.js'

export class Order {
  #_id
  #number
  #business
  #user
  #products
  #totalPrice
  #status

  constructor({
    _id = generateUUID(),
    number = generateRandomNumber(),
    business,
    user,
    products,
    totalPrice,
    status = 'pending',
  }) {
    this.#_id = _id
    this.number = number
    this.business = business
    this.user = user
    this.products = products
    this.totalPrice = totalPrice
    this.#status = status
  }

  get _id() { return this.#_id }
  get number() { return this.#number }
  get business() { return this.#business }
  get user() { return this.#user }
  get products() { return this.#products }
  get totalPrice() { return this.#totalPrice }

  set number(value) {
    if (!value) {
      throw new Error('MISSING_REQUIRED_PARAM')
    }
    this.#number = value
  }

  set business(value) {
    if (!value) {
      throw new Error('MISSING_REQUIRED_PARAM')
    }
    this.#business = value
  }

  set user(value) {
    if (!value) {
      throw new Error('MISSING_REQUIRED_PARAM')
    }
    this.#user = value
  }

  set products(value) {
    if (!value) {
      throw new Error('MISSING_REQUIRED_PARAM')
    }
    this.#products = value
  }

  set totalPrice(value) {
    if (!value) {
      throw new Error('MISSING_REQUIRED_PARAM')
    }
    this.#totalPrice = value
  }

  complete() {
    this.#status = 'completed'
  }

  cancel() {
    this.#status = 'cancelled'
  }

  toPOJO() {
    return {
      _id: this.#_id,
      number: this.#number,
      business: this.#business,
      user: this.#user,
      products: this.#products,
      totalPrice: this.#totalPrice,
      status: this.#status
    }
  }
}



