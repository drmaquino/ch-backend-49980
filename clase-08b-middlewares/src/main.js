import express from 'express'
import { apiRouter } from './routers/apiRouter.js'
import { webRouter } from './routers/webRouter.js'


const app = express()

app.use(express.json()) // para leer json en el cuerpo de la peticiones

app.use(express.static('./views'))
app.use('/static', express.static('./static'))

app.use('/api', apiRouter)
app.use('/', webRouter)


app.use((err, req, res, next) => {
  res.json({
    status: 'error',
    descr: err.message
  })
})

app.listen(8080, () => {
  console.log('conectado!')
})