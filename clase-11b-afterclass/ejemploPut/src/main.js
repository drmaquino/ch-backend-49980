import express from 'express'
import { PORT } from './config.js'
import { personasManager } from './services/PersonasManager.js'


const app = express()
app.use(express.json())

app.get('/api/personas', async (req, res) => {
  try {
    res.json(await personasManager.findAll())
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
})

app.get('/api/personas/:id', async (req, res) => {
  try {
    const buscada = await personasManager.findById(req.params.id)
    res.json(buscada)
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    })
  }
})

app.post('/api/personas', async (req, res) => {
  try {
    const creada = await personasManager.create(req.body)
    res.status(201).json(creada)
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
})

app.put('/api/personas/:id', async (req, res) => {
  try {
    const nuevaPersona = await personasManager.updateById(req.params.id, req.body)
    res.json(nuevaPersona)
  } catch (error) {
    if (error.message === 'id no encontrado') {
      res.status(404)
    } else {
      res.status(400)
    }

    res.json({
      status: 'error',
      message: error.message
    })
  }
})

app.delete('/api/personas/:id', async (req, res) => {
  try {
    const borrada = await personasManager.deleteById(req.params.id)
    res.json(borrada)
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      message: error.message
    })
  }
})

const server = app.listen(PORT, () => {
  console.log(`escuchando en puerto ${PORT}`)
})