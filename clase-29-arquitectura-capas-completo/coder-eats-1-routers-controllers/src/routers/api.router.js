import { Router, json } from 'express'
import { usersRouter } from './users.router.js'
import { ordersRouter } from './orders.router.js'
import { businessRouter } from './business.router.js'

export const apiRouter = Router()

apiRouter.use(json())

apiRouter.use('/users', usersRouter)
apiRouter.use('/orders', ordersRouter)
apiRouter.use('/business', businessRouter)
