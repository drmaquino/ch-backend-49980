export class DaoMemory {

  constructor() {
    this.elements = []
  }

  async createOne(userDto) {
    this.elements.push(userDto)
    return userDto
  }

  async readOne(query) {
    const buscado = this.elements.find(e => {
      for (const field in query) {
        if (e[field] && e[field] === query[field]) {
          return true
        }
      }
      return false
    })
    return buscado || null
  }
  async readMany() {
    throw new Error('NOT IMPLEMENTED!')
  }
  async updateOne(query, newDocDto) {
    throw new Error('NOT IMPLEMENTED!')
  }
  async updateMany() {
    throw new Error('NOT IMPLEMENTED!')
  }
  async deleteOne() {
    throw new Error('NOT IMPLEMENTED!')
  }
  async deleteMany() {
    throw new Error('NOT IMPLEMENTED!')
  }
}
