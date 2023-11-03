import { PERSONAS_JSON, PORT } from "./config.js"
import express from 'express'
import { PersonasManager } from './PersonasManager.js'

const pm = new PersonasManager(PERSONAS_JSON)

const app = express()

app.get('/personas', async (req, res) => {
  const edad = parseInt(String(req.query.edad))

  try {
    const personas = await pm.getAll({ edad })
    res.json(personas)
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    })
  }
})

app.get('/personas/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const personas = await pm.getById(id)
    res.json(personas)
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    })
  }
})

app.listen(PORT, () => {
  console.log(`conectado y escuchando en puerto ${PORT}`)
})