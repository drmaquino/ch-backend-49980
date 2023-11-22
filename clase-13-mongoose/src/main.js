import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_CNX_STR, PORT } from './config.js'
import { apiPersonasRouter } from './routers/api.personas.router.js'

await mongoose.connect(MONGODB_CNX_STR)
console.log(`base de datos conectada a ${MONGODB_CNX_STR}`)

const app = express()

app.listen(PORT, () => {
  console.log(`servidor http escuchando en puerto ${PORT}`)
})

app.use(apiPersonasRouter)
