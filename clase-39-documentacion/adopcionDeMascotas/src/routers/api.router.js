import { Router } from 'express'

import { usuariosRouter } from './usuarios.router.js'
import { mascotasRouter } from './mascotas.router.js'
import { adopcionesRouter } from './adopciones.router.js'
import { sesionesRouter } from './sesiones.router.js'
import { apiErrorHandler } from '../middlewares/apiErrorHandler.js'
import { docsRouter } from './documentacion.router.js'

export const apiRouter = Router()

apiRouter.use('/docs', docsRouter)

apiRouter.use('/usuarios', usuariosRouter)
apiRouter.use('/mascotas', mascotasRouter)
apiRouter.use('/adopciones', adopcionesRouter)
apiRouter.use('/sesiones', sesionesRouter)

apiRouter.use(apiErrorHandler)
