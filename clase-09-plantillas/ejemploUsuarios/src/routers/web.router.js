import { Router } from 'express'
import { personasManager } from '../services/PersonasManager.js'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
  res.render('index', { titulo: 'Inicio' })
})

webRouter.get('/personas', async (req, res) => {
  const personas = await personasManager.obtenerTodas()
  res.render('personas', {
    titulo: 'Personas',
    hayPersonas: personas.length > 0,
    personas
  })
})