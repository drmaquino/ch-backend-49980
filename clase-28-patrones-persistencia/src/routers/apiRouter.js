import { Router, json, urlencoded } from 'express'
import { usersRouter } from './usersRouter.js'

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

apiRouter.use('/users', usersRouter)