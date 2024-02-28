import { DatosCrearAdopcion } from '../models/inputs/DatosCrearAdopcion.input.js'
import { adopcionesRepository } from '../repositories/adopciones.repository.js'
import { adopcionesService } from '../services/adopciones.service.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await adopcionesRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const adopciones = await adopcionesRepository.readMany(req.query)
      res.json(adopciones)
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const creado = await adopcionesService.registrar(new DatosCrearAdopcion(req.body))
    res.status(201).json(creado)
  } catch (error) {
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    const actualizado = await adopcionesRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await adopcionesRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    next(error)
  }
}