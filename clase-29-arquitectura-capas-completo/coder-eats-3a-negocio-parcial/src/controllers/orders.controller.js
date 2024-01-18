import { ordersDao } from '../daos/index.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      res.json(await ordersDao.readOne({ _id: req.params.id }))
    } else {
      res.json(await ordersDao.readMany({}))
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    res.json(await ordersDao.create(req.body))
  } catch (error) {
    next(error)
  }
}
