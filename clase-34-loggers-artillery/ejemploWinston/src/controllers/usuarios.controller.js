export async function handleGet(req, res, next) {
  req.logger.http('entré al get de usuarios')
  try {
    if (req.params.id) {
      req.logger.verbose('recibi id: ' + req.params.id)
      // ejecuto la accion de negocio correspondiente
      res.json({/* resultado */ })
    } else {
      req.logger.verbose('recibi query: ' + JSON.stringify(req.query))
      // ejecuto la accion de negocio correspondiente
      res.json({/* resultado */ })
    }
  } catch (error) {
    req.logger.error('fallo get usuarios. error: ' + error.message)
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    // ejecuto la accion de negocio correspondiente
    res.status(201).json({/* resultado */ })
  } catch (error) {
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    // ejecuto la accion de negocio correspondiente
    res.json({/* resultado */ })
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    // ejecuto la accion de negocio correspondiente
    res.json({/* resultado */ })
  } catch (error) {
    next(error)
  }
}