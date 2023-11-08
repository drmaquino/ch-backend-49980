import express from 'express'
import { engine } from 'express-handlebars'
import { Server as IOServer } from 'socket.io'

import { webRouter } from './routers/web.router.js'
import { apiRouter } from './routers/api.router.js'
import { mensajeManager } from './services/MensajeManager.js'

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

const server = app.listen(8080, () => {
  console.log('escuchando en puerto 8080!')
})

const ioServer = new IOServer(server)

ioServer.on('connection', async socket => {
  console.log('nueva conexion: ', socket.id)
  socket.emit('mensajes',
    await mensajeManager.obtenerTodos())

  socket.on('nuevoMensaje', async mensaje => {
    await mensajeManager.agregar(mensaje)
    ioServer.sockets.emit('mensajes',
      await mensajeManager.obtenerTodos())
  })
})

// inyecto el servidor de websockets en cada peticion!
app.use((req, res, next) => {
  req['io'] = ioServer
  next()
})

app.use(express.json())
app.use('/static', express.static('./static'))

app.use('/', webRouter)
app.use('/api', apiRouter)
