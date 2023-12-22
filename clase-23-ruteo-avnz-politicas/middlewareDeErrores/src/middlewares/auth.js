
export function soloLogueadosApi(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(400).json({ status: 'error', message: 'necesita iniciar sesion' })
  }
  next()
}

export function soloLogueadosWeb(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  next()
}

export function soloRoles(roles = []) {
  return function (req, res, next) {
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ status: 'error', message: `solo para ${roles}` })
    }
    next()
  }
}

export function isAdmin(username, password) {
  return username === 'adminCoder@coder.com' && password === 'adminCod3r123'
}
