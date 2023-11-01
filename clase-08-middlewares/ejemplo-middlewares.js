import express from 'express'
import { PersonasManager } from './PersonasManager.js'

const pm = new PersonasManager()

const app = express()

app.use(express.json()) // para leer json en el cuerpo de la peticiones
app.use(express.urlencoded({ extended: true })) // para interpretar formularios

app.use((req, res, next) => {
  console.log('mid 1')
  req['carga'] = 'cositas'
  next()
  // next(error)
})

app.use((req, res, next) => {
  console.log('mid 2')
  if (parseInt(String(req.query.limit)) < 0) {
    return next(new Error('los limites deben ser positivos'))
  }
  next()
})

app.use((req, res, next) => {
  console.log('mid 3')
  next()
  // next(error)
})

app.get('/cosas', (req, res) => {
  console.log('controller!')
  console.log(req['carga'])
  const limit = parseInt(String(req.query.limit))
  const cosas = pm.getAll()
  res.json(cosas.slice(0, limit))
})

app.use((err, req, res, next) => {
  res.json({
    status: 'error',
    descr: err.message
  })
})

app.listen(8080, () => {
  console.log('conectado!')
})