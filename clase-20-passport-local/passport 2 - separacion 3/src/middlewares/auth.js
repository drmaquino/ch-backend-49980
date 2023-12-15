
export function soloLogueadosApi(req, res, next) {

  if (!req.isAuthenticated()) {
    return res.status(400).json({ status: 'error', message: 'necesita iniciar sesion' })
  }

  // if (!req.session['user']) {
  //   return res.status(400).json({ status: 'error', message: 'necesita iniciar sesion' })
  // }

  next()
}

export function soloLogueadosWeb(req, res, next) {

  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }

  // if (!req.session['user']) {
  //   return res.redirect('/login')
  // }

  next()
}
