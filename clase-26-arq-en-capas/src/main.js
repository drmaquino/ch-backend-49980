import express from 'express'
import { usersRouter } from './routers/users.router.js'
import mongoose from 'mongoose'
import { MONGODB_CNX_STR, PORT } from './config/config.js'
import { juguetesRouter } from './routers/juguetes.router.js'

await mongoose.connect(MONGODB_CNX_STR)

const app = express()
app.listen(PORT, () => { console.log('conectado!') })

app.use('/static', express.static('./static'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/usuarios', usersRouter)
app.use('/api/juguetes', juguetesRouter)

// open / closed
// abierto para extender, cerrado para modificar
// puedo agregar funcionalidad agregando archivos
// no deberia modificar las cosas que ya existen, que ya funcionan