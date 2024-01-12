import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { MONGODB_CNX_STR, PORT } from './config/config.js'
import { apiRouter } from './routers/api/api.router.js'

await mongoose.connect(MONGODB_CNX_STR)

const app = express()
app.listen(PORT, () => { console.log('conectado!') })

app.use(cors())

app.use('/static', express.static('./static'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)
