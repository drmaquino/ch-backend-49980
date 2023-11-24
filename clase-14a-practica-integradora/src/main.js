import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from './config/mongodb.config.js'
import { PORT } from './config/server.config.js'
import { apiInmobiliariaRouter } from './routers/api.inmobiliaria.router.js'
import { webInmobiliariaRouter } from './routers/web.inmobiliaria.router.js'
import { engine } from 'express-handlebars'

await mongoose.connect(MONGODB_CNX_STR)
console.log(`base de datos conectada`)

const app = express()

app.engine('handlebars', engine())

const server = app.listen(PORT, () => { console.log(`servidor escuchando en puerto ${PORT}`) })

app.use('/static', express.static('./static'))

app.use('/api', apiInmobiliariaRouter)
app.use('/', webInmobiliariaRouter)