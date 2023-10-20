class Usuario {
  constructor({ id, nombre, apellido, nombreUsuario, contrasenia, salt }) {
    this.id = id
    this.nombre = nombre
    this.apellido = apellido
    this.nombreUsuario = nombreUsuario
    this.contrasenia = contrasenia
    this.salt = salt
  }

  paraMostrar() {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      nombreUsuario: this.nombreUsuario
    }
  }
}

exports.Usuario = Usuario
