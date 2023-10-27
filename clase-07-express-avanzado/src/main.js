import express from 'express'
import { PORT } from './config.js'

const palabras = ['Frase', 'inicial']

const app = express()
app.use(express.json())

app.get('/api/palabras', (req, res) => {
  res.json({
    frase: palabras.join(' ')
  })
})

app.get('/api/palabras/:pos', (req, res) => {
  const posicion = parseInt(req.params.pos)
  if (posicion < 1 || posicion > palabras.length) {
    return res.json({ error: 'la posicion es inválida' })
  }

  res.json({ buscada: palabras[posicion - 1] })
})

app.post('/api/palabras', (req, res) => {
  const palabra = req.body.palabra
  if (!palabra) {
    return res.json({ error: 'palabra para agregar invalida' })
  }

  palabras.push(palabra)
  res.json({
    agregada: palabra,
    pos: palabras.length
  })
})

app.put('/api/palabras/:pos', (req, res) => {
  const posicion = parseInt(req.params.pos)
  if (posicion < 1 || posicion > palabras.length) {
    return res.json({ error: 'la posicion es inválida' })
  }

  const palabra = req.body.palabra
  if (!palabra) {
    return res.json({ error: 'la palabra es inválida' })
  }

  const anterior = palabras[posicion - 1]
  palabras[posicion - 1] = palabra
  res.json({
    actualizada: palabra,
    anterior: anterior
  })
})

app.delete('/api/palabras/:pos', (req, res) => {
  const posicion = parseInt(req.params.pos)
  if (posicion < 1 || posicion > palabras.length) {
    return res.json({ error: 'la posicion es inválida' })
  }

  const [borrada] = palabras.splice(posicion - 1, 1)
  res.json({
    borrada
  })
})

const server = app.listen(PORT, () => {
  console.log(`escuchando en puerto ${PORT}`)
})