export class DatosConsultaUsuario {
  constructor({ nombre, apellido, email }) {
    this.nombreCompleto = `${nombre} ${apellido}`
    this.email = email
  }
}