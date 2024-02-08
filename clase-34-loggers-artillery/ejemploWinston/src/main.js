import { PORT } from './config/server.config.js'
import { app } from './app/app.js'
import { logger } from './utils/logger.js'

app.listen(PORT, () => { logger.info(`escuchando en puerto ${PORT}`) })