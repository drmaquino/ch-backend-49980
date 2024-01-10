// RUTEO

export function autorizar(req, res, next) { next() }

export function soloRol(rol) {
  return function (req, res, next) {
    // LO COMENTO PARA QUE FUNCIONE EL EJEMPLO!! (pq no hay autenticacion implementada..)
    // if (req.user.rol === rol) return next()
    // next(new Error('no tiene permiso. solo rol: ' + rol))
    next()
  }
}