import { Router, json } from 'express'
import { usersRouter } from './users.router.js'
import { ordersRouter } from './orders.router.js'
import { businessesRouter } from './businesses.router.js'
import { sessionsRouter } from './sessions.router.js'
import { TiposDeError } from '../models/errors/tiposDeError.js'

export const apiRouter = Router()

apiRouter.use(json())

apiRouter.use('/users', usersRouter)
apiRouter.use('/orders', ordersRouter)
apiRouter.use('/business', businessesRouter)
apiRouter.use('/sessions', sessionsRouter)


apiRouter.use((error, req, res, next) => {
  if (error.type === TiposDeError.AUTH_ERROR) {
    res.status(401)
  } else if (error.type === TiposDeError.NOT_FOUND_ERROR) {
    res.status(404)
  } else {
    res.status(500)
  }
  res.json({ status: 'error', message: error.message })
})