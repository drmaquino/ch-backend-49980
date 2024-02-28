export class CustomError extends Error {
  constructor(mensaje, { recurso = '', operacion = '', descripcion = '' }
    = { recurso: '', operacion: '', descripcion: '' }) {
    super(mensaje)
    this.recurso = recurso
    this.operacion = operacion
    this.descripcion = descripcion
  }

  setRecurso(recurso) {
    this.recurso = recurso
    return this
  }

  setOperacion(operacion) {
    this.operacion = operacion
    return this
  }

  setDescripcion(descripcion) {
    this.descripcion = descripcion
    return this
  }
}