export class Persona {
  #id
  #nombre
  #edad
  constructor({ id, nombre, edad }) {
    this.#id = id
    this.nombre = nombre
    this.edad = edad
  }

  get id() { return this.#id }

  set nombre(valor) {
    if (!valor) throw new Error('el nombre debe contener al menos un caracter')
    this.#nombre = valor
  }

  get nombre() { return this.#nombre }

  set edad(valor) {
    if (!valor) throw new Error('la persona debe tener una edad')
    this.#edad = valor
  }

  get edad() { return this.#edad }

  con(datos) {
    const nuevosDatos = this.toPOJO()

    if (datos.nombre) {
      nuevosDatos.nombre = datos.nombre
    }

    if (datos.edad) {
      nuevosDatos.edad = datos.edad
    }

    return new Persona(nuevosDatos)
  }

  toPOJO() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      edad: this.#edad,
    }
  }
}