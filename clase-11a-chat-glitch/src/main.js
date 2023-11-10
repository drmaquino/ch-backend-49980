import express from 'express'
import { PORT } from './config.js'
import { Server } from 'socket.io'
import { mensajeManager } from './services/MensajeManager.js'

const app = express()

const server = app.listen(PORT, () => { console.log(`escuchando en puerto ${PORT}`) })

const io = new Server(server)

app.use('/static', express.static('./static'))
app.use(express.static('./views'))

io.on('connection', async (socket) => {

  socket.emit('mensajes', await mensajeManager.obtenerTodos())

  socket.broadcast.emit('nuevoUsuario',
    socket.handshake.auth.username
  )

  socket.on('mensaje', async msg => {
    console.log(msg)
    await mensajeManager.agregar(msg)
    io.sockets.emit('mensajes', await mensajeManager.obtenerTodos())
  })

  socket.on('disconnecting', reason => {
    socket.broadcast.emit('usuarioDesconectado',
      socket.handshake.auth.username)
  })

})