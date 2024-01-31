import { generateUUID } from '../utils/utils.js'

export class Business {
  #_id
  #name
  #products

  constructor({
    _id = generateUUID(),
    name,
    products = [],
  }) {
    this.#_id = _id
    this.name = name
    this.#products = products
  }

  get _id() { return this.#_id }
  get name() { return this.#name }
  get products() { return this.#products }

  set name(value) {
    if (!value) {
      throw new Error('MISSING_REQUIRED_PARAM')
    }
    this.#name = value
  }

  toPOJO() {
    return {
      _id: this.#_id,
      name: this.#name,
      products: this.#products,
    }
  }
}



