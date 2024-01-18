import { Router } from 'express'

import { ordenesRouter } from './ordenes.router.js'
import { usuariosRouter } from './usuarios.router.js'
import { comerciosRouter } from './comercios.router.js'
import { productosRouter } from './productos.router.js'

export const apiRouter = Router()

apiRouter.use((req, res, next) => {
  console.log(`(${req.method}) ${req.url}`)
  next()
})

apiRouter.use('/productos', productosRouter)
apiRouter.use('/comercios', comerciosRouter)
apiRouter.use('/usuarios', usuariosRouter)
apiRouter.use('/ordenes', ordenesRouter)
