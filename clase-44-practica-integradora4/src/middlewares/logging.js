import { logger } from '../utils/logger.js'

/**
 * @param {import('express').Request} req 
 * @param {*} res 
 * @param {*} next 
 */
export function logging(req, res, next) {
  logger.http({
    method: req.method,
    url: req.url
  })
  next()
}