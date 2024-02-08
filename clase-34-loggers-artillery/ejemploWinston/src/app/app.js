import express from 'express'
import { usuariosRouter } from '../routers/usuarios.router.js'
import { loggerInRequest } from '../middlewares/logger.js'
import { errorHandler } from '../middlewares/errors.js'

export const app = express()

app.use(express.json())

app.use(loggerInRequest)

app.use('/api/usuarios', usuariosRouter)

app.use(errorHandler)
