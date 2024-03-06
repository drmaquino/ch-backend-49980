export function errorHandler(error, req, res, next) {
  if (error.message === 'not found') {
    res.status(404)
  } else if (error.message === 'not authorized') {
    res.status(403)
  } else {
    res.status(500)
  }
  console.log(error)

  res.json({
    status: 'error',
    message: error.message,
  })
}