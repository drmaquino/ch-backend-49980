import express from 'express'
import { connect } from 'mongoose'
import { PORT } from './config.js'
import { apiRouter } from './routers/api.router.js'
import { MONGODB_CNX_STR } from './config.js'

await connect(MONGODB_CNX_STR)
console.log(`base de datos conectada`)

const app = express()

app.listen(PORT, () => { console.log(`servidor escuchando en puerto ${PORT}`) })

app.use('/static', express.static('./static'))

app.use('/api', apiRouter)