
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

export function soloAdmins(req, res, next) {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ status: 'error', message: 'solo para admins' })
  }
  next()
}

export function isAdmin(username, password) {
  return username === 'adminCoder@coder.com' && password === 'adminCod3r123'
}
