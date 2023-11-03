import { Router } from 'express'
import { PersonasManager } from '../services/PersonasManager.js'

const pm = new PersonasManager()

export const personasRouter = Router()

personasRouter.get('/', (req, res) => {
  const limit = parseInt(String(req.query.limit))
  const cosas = pm.getAll()
  res.json(cosas.slice(0, limit))
})

personasRouter.post('/', (req, res) => {
  const datosPersona = req.body
  const personaAgregada = pm.add(datosPersona)
  res.json(personaAgregada)
})