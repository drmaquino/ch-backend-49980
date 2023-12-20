import { Router } from 'express'

import { sesionesRouter } from './sesiones.router.js'
import { usuariosRouter } from './usuarios.router.js'

export const apiRouter = Router()

apiRouter.use('/sesiones', sesionesRouter)
apiRouter.use('/usuarios', usuariosRouter)

// middleware de error para todos los errores de la api rest!
// acá llegan todos los errores lanzados desde los next() !
apiRouter.use((error, req, res, next) => {
  res.status(401).json({
    status: 'error',
    message: 'login failed'
  })
})