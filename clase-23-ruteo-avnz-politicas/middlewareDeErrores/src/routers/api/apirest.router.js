import { Router } from 'express'

import { sesionesRouter } from './sesiones.router.js'
import { usuariosRouter } from './usuarios.router.js'
import { respuestasMejoradas } from '../../middlewares/respuestasMejoradas.js'
import { manejoDeErroresApiRest } from '../../middlewares/manejoDeErroresApiRest.js'

export const apiRouter = Router()

// agrego respuestas homogeneas al objeto res
// antes de recibir las peticiones
apiRouter.use(respuestasMejoradas)

apiRouter.use('/sesiones', sesionesRouter)
apiRouter.use('/usuarios', usuariosRouter)

// middleware de error para todos los errores de la api rest!
// acá llegan todos los errores lanzados desde los next() !
apiRouter.use(manejoDeErroresApiRest)