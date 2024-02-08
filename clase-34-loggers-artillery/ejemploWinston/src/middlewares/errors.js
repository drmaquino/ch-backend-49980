export function errorHandler(error, req, res, next) {
  req.logger.error(error.message)
  // manejo los errores segun su tipo
  next(error)
}