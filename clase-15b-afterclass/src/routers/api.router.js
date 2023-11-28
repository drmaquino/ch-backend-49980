import { Router, json } from 'express'
import { gatitosRouter } from './gatitos.router.js'

export const apiRouter = Router()

apiRouter.use(json())

apiRouter.use('/gatitos', gatitosRouter)
