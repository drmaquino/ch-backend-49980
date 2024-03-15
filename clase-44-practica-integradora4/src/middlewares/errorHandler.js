import { logger } from '../utils/logger.js'

export function errorHandler(error, req, res, next) {
  if (error.message === 'invalid arguments') {
    res.status(400)
  } else if (error.message === 'not authenticated') {
    res.status(401)
  } else if (error.message === 'not found') {
    res.status(404)
  } else {
    res.status(500)
  }

  logger.error(error)

  res.json({
    status: 'error',
    message: error.message,
  })
}