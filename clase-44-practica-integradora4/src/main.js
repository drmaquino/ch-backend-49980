import { logger } from './utils/logger.js'
import { connectDb } from './database/mongodb.js'
import { levantarServidor } from './app/app.js'
import { PORT } from './config/config.js'

await connectDb()
logger.info(`conectado a base de datos`)

await levantarServidor(Number(PORT))
logger.info(`servidor escuchando peticiones en puerto: ${PORT}`)
