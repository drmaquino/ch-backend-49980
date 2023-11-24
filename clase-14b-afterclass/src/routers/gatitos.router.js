import { Router } from 'express'
import { Gatito } from '../models/Gatito.mongoose.js'
import { extractFile } from '../middlewares/files.js'

export const gatitosRouter = Router()

gatitosRouter.get('/', async (req, res) => {
  const gatitos = await Gatito.find()
  res.json(gatitos)
})

gatitosRouter.get('/:id', async (req, res) => {
  const gatito = await Gatito.findById(req.params.id)
  if (!gatito) {
    return res.status(404).json({ message: 'gatito not found' })
  }
  res.json(gatito)
})

gatitosRouter.post('/', extractFile('fotoUrl'), async (req, res) => {
  try {
    if (req.file) {
      req.body.fotoUrl = req.file.path
    }
    const creado = await Gatito.create(req.body)
    res.status(201).json(creado)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

gatitosRouter.put('/:id', async (req, res) => {
  if (req.body.fotoUrl) {
    return res.status(400).json({ message: 'fotoUrl no se puede modificar' })
  }
  const modificado = await Gatito.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true })
  if (!modificado) {
    return res.status(404).json({ message: 'gatito not found' })
  }
  res.json(modificado)
})

gatitosRouter.delete('/:id', async (req, res) => {
  const borrado = await Gatito.findByIdAndDelete(req.params.id)
  if (!borrado) {
    return res.status(404).json({ message: 'gatito not found' })
  }
  res.json(borrado)
})

gatitosRouter.post('/:id/fotourl', extractFile('fotoUrl'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'debe cargar una foto válida' })
  }
  const modificado = await Gatito.findByIdAndUpdate(
    req.params.id,
    { $set: { fotoUrl: req.file.path } },
    { new: true })
  if (!modificado) {
    return res.status(404).json({ message: 'gatito not found' })
  }
  res.json(modificado)
})
