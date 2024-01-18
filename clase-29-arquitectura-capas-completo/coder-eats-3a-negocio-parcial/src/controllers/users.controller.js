import { usersDao } from '../daos/index.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      res.json(await usersDao.readOne({ _id: req.params.id }))
    } else {
      res.json(await usersDao.readMany({}))
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    res.json(await usersDao.create(req.body))
  } catch (error) {
    next(error)
  }
}
