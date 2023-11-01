import { Router } from 'express'
import { ventasRouter } from './ventasRouter.js'
import { personasRouter } from './personasRouter.js'

export const apiRouter = Router()

apiRouter.use('/ventas', ventasRouter)
apiRouter.use('/personas', personasRouter)