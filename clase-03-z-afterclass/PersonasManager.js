class Persona {
  /** @type {number} */
  #edad

  /** 
   * @param {{id:number, nombre:string, edad:number}} param0 
   */
  constructor({ id, nombre, edad }) {
    this.id = id
    this.nombre = nombre
    this.edad = edad
  }

  /**
   * actualiza la edad de la persona 
   * @throws si la edad es negativa
   */
  set edad(nuevaEdad) {
    if (nuevaEdad < 0) {
      throw new Error('la edad no puede ser menor a cero')
    }
    this.#edad = nuevaEdad
  }

  get edad() {
    return this.#edad
  }

  asPOJO() {
    return {
      id: this.id,
      nombre: this.nombre,
      edad: this.#edad
    }
  }
}

class PersonasManager {
  static #ultimoId = 0

  /** @type {Persona[]} */
  #personas

  constructor() {
    this.#personas = []
  }

  static #generarNuevoId() {
    return ++PersonasManager.#ultimoId
  }

  /**
   * crea una persona, le asigna un id, la guarda, y le devuelve
   * @param {{nombre:string, edad:number}} param0 
   */
  addPersona({ nombre, edad }) {
    const id = PersonasManager.#generarNuevoId()
    const persona = new Persona({ id, nombre, edad })
    this.#personas.push(persona)
    return persona
  }

  getPersonas() {
    return this.#personas
  }

  /**
   * busca y devuelve una persona con un id dado
   * @param {number} id
   * @throws si no la encuentra
   */
  getPersonaById(id) {
    const buscada = this.#personas.find(p => p.id === id)
    if (!buscada) throw new Error(`persona con id ${id} no encontrada`)
    return buscada
  }
}

const pm = new PersonasManager()

const p1 = pm.addPersona({ nombre: 'aa', edad: 20 })
const p2 = pm.addPersona({ nombre: 'bb', edad: 30 })
const p3 = pm.addPersona({ nombre: 'cc', edad: 40 })
const p4 = pm.addPersona({ nombre: 'cc', edad: 35 })

console.log(p1.asPOJO())
console.log(p2.asPOJO())
console.log(p3.asPOJO())
console.log(p4.asPOJO())

try {
  p1.edad = -50
} catch (error) {
  console.log(error.message)
}

p1.edad = 50

console.log(pm.getPersonas().map(p => p.asPOJO()))

// esto no!
// const personas = pm.getPersonas()
// console.log(personas.find(p => p.id === 3).asPOJO())

try {
  // esto sí:
  const buscada = pm.getPersonaById(3)
  // uso la instancia de persona para operar sobre ella
  buscada.edad = 7
  // uso el POJO para mostrar sus datos
  console.log(buscada.asPOJO())
} catch (error) {
  console.log(error.message)
}

try {
  const buscada2 = pm.getPersonaById(10)
} catch (error) {
  console.log(error.message)
}