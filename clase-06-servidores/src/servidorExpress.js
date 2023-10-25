import express from 'express'
import { ProfesManager } from './ProfesManager.js'

const profesManager = new ProfesManager('./db/profes.json')
const estudiantesManager = new ProfesManager('./db/estudiantes.json')

const app = express()

app.get('/estudiantes', async (req, res) => {
  res.json({
    estudiantes: await estudiantesManager.obtenerTodos()
  })
})

app.get('/estudiantes/:id', async (req, res) => {
  const idEstudiante = parseInt(req.params['id'])
  const buscado = await estudiantesManager.obtenerSegunId(idEstudiante)
  if (buscado) {
    res.json({ estudiante: buscado })
  } else {
    res.json({ error: `no se encontró el profe con id ${idEstudiante}` })
  }
})

app.get('/profes', async (req, res) => {
  const rol = req.query['rol']
  if (rol) {
    res.json({
      profes: await profesManager.obtenerSegunRol(rol)
    })
  } else {
    res.json({
      profes: await profesManager.obtenerTodos()
    })
  }
})

app.get('/profes/:id', async (req, res) => {
  const idProfe = parseInt(req.params['id'])
  const buscado = await profesManager.obtenerSegunId(idProfe)
  if (buscado) {
    res.json({ profe: buscado })
  } else {
    res.json({ error: `no se encontró el profe con id ${idProfe}` })
  }
})

app.get('/', (req, res) => {
  // res.send(`<h1>Aguante el Backend!</h1>`)
  res.sendFile('index.html', { root: './views' })
})

app.listen(8080, () => {
  console.log('conectado al puerto 8080!')
})