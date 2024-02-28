import { Usuario } from '../models/entities/Usuario.js'
import { DatosCrearUsuario } from '../models/inputs/DatosCrearUsuario.input.js'
import { ErrorOperacionInvalida } from '../models/errors/OperacionInvalida.error.js'
import { usuariosRepository } from '../repositories/usuarios.repository.js'
import { criptografiador } from './criptografia.service.js'
import { ErrorInterno } from '../models/errors/ErrorInterno.error.js'
import { ErrorNoEncontrado } from '../models/errors/NoEncontrado.error.js'
import { DatosConsultaUsuario as DatosConsultaUsuario } from '../models/dtos/DatosConsultaUsuario.dto.js'

class UsuariosService {
  constructor(usuariosRepository, criptografiador) {
    this.usuariosRepository = usuariosRepository
    this.criptografiador = criptografiador
  }

  /**
   * @param {DatosCrearUsuario} datosUsuario 
   * @returns {Promise<DatosConsultaUsuario>} 
   */
  async registrar(datosUsuario) {
    let yaExiste
    try {
      yaExiste = await this.usuariosRepository.readOne({ email: datosUsuario.email })
    } catch (error) {
      if (!(error instanceof ErrorNoEncontrado)) {
        throw new ErrorInterno()
          .setRecurso('usuarios')
          .setOperacion('consulta')
          .setDescripcion(error.message)
      }
    }

    if (yaExiste) {
      throw new ErrorOperacionInvalida({
        recurso: 'usuarios',
        operacion: 'registro',
        descripcion: 'ya existe un usuario con el mismo email',
      })
    }

    const usuario = new Usuario(datosUsuario)
    usuario.password = this.criptografiador.hashear(usuario.password)

    try {
      await usuariosRepository.create(usuario)
    } catch (error) {
      throw new ErrorInterno({
        recurso: 'usuarios',
        operacion: 'creacion',
        descripcion: error.message,
      })
    }

    return new DatosConsultaUsuario(usuario)
  }
}

export const usuariosService = new UsuariosService(usuariosRepository, criptografiador)
