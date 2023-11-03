import { Persona } from '../models/Persona.js'

export class PersonasManager {
  constructor() {
    this.personas = [{
      nombre: 'marian'
    }]
  }

  getAll() {
    return this.personas
  }

  add(datosPersona) {
    const nueva = new Persona(datosPersona)
    this.personas.push(nueva)
    return nueva
  }
}
