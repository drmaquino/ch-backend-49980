import { Router } from 'express'
import { VentasManager } from '../services/VentasManager.js'

const vm = new VentasManager()

export const ventasRouter = Router()

ventasRouter.get('/', (req, res) => {
  const limit = parseInt(String(req.query.limit))
  const cosas = vm.getAll()
  res.json(cosas.slice(0, limit))
})

ventasRouter.post('/', (req, res) => {
  const datosVenta = req.body
  const ventaAgregada = vm.add(datosVenta)
  res.json(ventaAgregada)
})