import { Comercio } from '../models/Comercio.js'
import { comerciosRepository } from '../repositories/comercios.repository.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await comerciosRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const comercios = await comerciosRepository.readMany(req.query)
      res.json(comercios)
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const comercio = new Comercio(req.body)
    const creado = await comerciosRepository.create(comercio.dto())
    res.status(201).json(creado)
  } catch (error) {
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    const actualizado = await comerciosRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await comerciosRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    next(error)
  }
}