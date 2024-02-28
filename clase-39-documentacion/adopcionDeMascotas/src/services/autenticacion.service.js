import { DatosConsultaUsuario } from '../models/dtos/DatosConsultaUsuario.dto.js'
import { ErrorAutenticacionFallida } from '../models/errors/AutenticacionFallida.error.js'
import { ErrorNoEncontrado } from '../models/errors/NoEncontrado.error.js'
import { usuariosRepository } from '../repositories/usuarios.repository.js'
import { criptografiador } from './criptografia.service.js'


class AutenticacionService {
  constructor(usuariosRepository, criptografiador) {
    this.usuariosRepository = usuariosRepository
    this.criptografiador = criptografiador
  }

  async login({ email, password }) {
    let usuario
    try {
      usuario = await usuariosRepository.readOne({ email })
    } catch (error) {
      throw error instanceof ErrorNoEncontrado
        ? new ErrorAutenticacionFallida()
        : error
    }

    if (!this.criptografiador.comparar(password, usuario.password)) {
      throw new ErrorAutenticacionFallida()
    }

    const datosSesion = new DatosConsultaUsuario(usuario)
    const token = this.criptografiador.generarToken(datosSesion)
    return token
  }
}

export const autenticacionService = new AutenticacionService(usuariosRepository, criptografiador)