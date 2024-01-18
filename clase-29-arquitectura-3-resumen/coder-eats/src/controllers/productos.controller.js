import { Producto } from '../models/Producto.js'
import { productosRepository } from '../repositories/productos.repository.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await productosRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const productos = await productosRepository.readMany(req.query)
      res.json(productos)
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const producto = new Producto(req.body)
    const creado = await productosRepository.create(producto.dto())
    res.status(201).json(creado)
  } catch (error) {
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    const actualizado = await productosRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await productosRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    next(error)
  }
}