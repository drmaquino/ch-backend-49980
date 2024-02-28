import { DatosCrearAdopcion } from '../models/inputs/DatosCrearAdopcion.input.js'
import { Adopcion } from '../models/entities/Adopcion.js'

import { adopcionesRepository } from '../repositories/adopciones.repository.js'
import { mascotasRepository } from '../repositories/mascotas.repository.js'
import { usuariosRepository } from '../repositories/usuarios.repository.js'

import { ErrorArgumentoInvalido } from '../models/errors/ArgumentoInvalido.error.js'
import { ErrorNoEncontrado } from '../models/errors/NoEncontrado.error.js'
import { ErrorOperacionInvalida } from '../models/errors/OperacionInvalida.error.js'

class AdopcionesService {
  constructor(adopcionesRepository, usuariosRepository, mascotasRepository) {
    this.adopcionesRepository = adopcionesRepository
    this.usuariosRepository = usuariosRepository
    this.mascotasRepository = mascotasRepository
  }

  /**
   * 
   * @param {DatosCrearAdopcion} param0 
   * @returns {Promise<Adopcion>}
   */
  async registrar({ idUsuario, idMascota }) {
    let usuario
    try {
      usuario = await usuariosRepository.readOne({ id: idUsuario })
    } catch (error) {
      if (error instanceof ErrorNoEncontrado) {
        throw new ErrorArgumentoInvalido({
          recurso: 'adopciones',
          operacion: 'registro',
          descripcion: 'usuario no encontrado',
        })
      } else {
        throw error
          .setRecurso('usuarios')
          .setOperacion('busqueda')
          .setDescripcion('error interno')
      }
    }

    let mascota
    try {
      mascota = await mascotasRepository.readOne({ id: idMascota })
    } catch (error) {
      if (error instanceof ErrorNoEncontrado) {
        throw new ErrorArgumentoInvalido({
          recurso: 'adopciones',
          operacion: 'registro',
          descripcion: 'mascota no encontrada',
        })
      } else {
        throw error
          .setRecurso('mascotas')
          .setOperacion('busqueda')
          .setDescripcion('error interno')
      }
    }

    if (mascota.adoptada) {
      throw new ErrorOperacionInvalida({
        recurso: 'adopciones',
        operacion: 'registro',
        descripcion: 'mascota ya adoptada',
      })
    }

    usuario.mascotas.push(idMascota)
    await usuariosRepository.updateOne({ id: idUsuario }, usuario)

    mascota.duenio = idUsuario
    mascota.adoptada = true
    await mascotasRepository.updateOne({ id: idMascota }, mascota)

    const adopcion = new Adopcion({ idDuenio: idUsuario, idMascota })
    await adopcionesRepository.create(adopcion)

    return adopcion
  }
}

export const adopcionesService = new AdopcionesService(adopcionesRepository, usuariosRepository, mascotasRepository)