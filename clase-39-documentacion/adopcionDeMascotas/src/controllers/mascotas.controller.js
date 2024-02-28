import { DatosCrearMascota } from '../models/inputs/DatosCrearMascota.input.js'
import { Mascota } from '../models/entities/Mascota.js'
import { mascotasRepository } from '../repositories/mascotas.repository.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await mascotasRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const mascotas = await mascotasRepository.readMany(req.query)
      res.json(mascotas)
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const datosMascota = new DatosCrearMascota({ ...req.body, foto: req.file?.path })
    const mascota = new Mascota(datosMascota)
    const creado = await mascotasRepository.create(mascota)
    res.status(201).json(creado)
  } catch (error) {
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    const actualizado = await mascotasRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await mascotasRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    next(error)
  }
}