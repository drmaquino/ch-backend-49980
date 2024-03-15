import express from 'express'
import { engine } from 'express-handlebars'

import { PORT } from '../config/config.js'
import { apiRouter } from '../routers/api/api.router.js'
import { webRouter } from '../routers/web/web.router.js'
import { passportInitialize } from '../middlewares/authentication.js'
import { cookies } from '../middlewares/cookies.js'
import { logging } from '../middlewares/logging.js'
import { docsRouter } from '../routers/web/documentacion.router.js'

const app = express()

app.engine('handlebars', engine())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookies)
app.use(passportInitialize)

app.use(logging)

app.use('/api-docs/', docsRouter)

app.use('/static', express.static('./static'))

app.use('/api', apiRouter)
app.use('/', webRouter)

let server

export function levantarServidor(puerto = 0) {
  return new Promise((resolve, reject) => {
    server = app.listen(puerto, () => {
      resolve(true)
    })
  })
}

export function cerrarServidor() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        reject(true)
      } else {
        resolve(true)
      }
    })
  })
}
