import { Router } from 'express'
import { usersRouter } from './users.router.js'
import { juguetesRouter } from './juguetes.router.js'

export const apiRouter = Router()

apiRouter.use('/usuarios', usersRouter)
apiRouter.use('/juguetes', juguetesRouter)
