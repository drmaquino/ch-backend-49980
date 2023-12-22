export function manejoDeErroresApiRest(error, req, res, next) {
  if (error.message.endsWith('no encontrado')) {
    return res.status(404).json({ status: 'error', message: error.message })
  } else {
    res.status(401).json({
      status: 'error',
      message: 'login failed'
    })
  }
}