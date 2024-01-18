export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      res.send('peticion "get" recibida!')
    } else {
      res.send('peticion "getById" recibida!')  
    }
  } catch (error) { 
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    res.send('peticion "post" recibida!')
  } catch (error) { 
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    res.send('peticion "put:id" recibida!')
  } catch (error) { 
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    res.send('peticion "delete:id" recibida!')
  } catch (error) { 
    next(error)
  }
}