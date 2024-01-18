import { ordenesRepository } from '../repositories/ordenes.repository.js'
import { ordenesService } from '../services/ordenes.service.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await ordenesRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const ordenes = await ordenesRepository.readMany(req.query)
      res.json(ordenes)
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const creada = await ordenesService.create(req.body)
    res.status(201).json(creada)
  } catch (error) {
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    const actualizado = await ordenesRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await ordenesRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    next(error)
  }
}