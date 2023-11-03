import { Router, json, urlencoded } from 'express'
import { personasManager } from '../services/PersonasManager.js'

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

apiRouter.post('/personas', async (req, res) => {
  try {
    const datosPersona = req.body
    req.body.edad = parseInt(req.body.edad)
    const persona = await personasManager.agregar(datosPersona)
    res.json({ status: 'ok', data: persona })
  } catch (error) {
    res.json({ status: 'error', error: error.message })
  }
})
