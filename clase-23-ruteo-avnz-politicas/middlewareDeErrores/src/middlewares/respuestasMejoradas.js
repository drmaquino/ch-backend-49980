export function respuestasMejoradas(req, res, next) {
  res['successfullPost'] = function (payload) {
    res
      .status(201)
      .json({
        status: 'success',
        payload
      })
  }
  res['successfullPut'] = function (payload) {
    res
      .status(200)
      .json({
        status: 'success',
        payload
      })
  }
  res['successfullGet'] = function (payload) {
    res
      .status(200)
      .json({
        status: 'success',
        payload
      })
  }
  res['successfullDelete'] = function () {
    res
      .status(204)
      .json({
        status: 'success',
      })
  }
  res['successfullLogout'] = function () {
    res
      .status(204)
      .json({
        status: 'success',
        message: 'logout OK'
      })
  }
  next()
}