import { usersService } from '../services/users.service.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const user = await usersService.readOne({ _id: req.params.id })
      res.json(user)
    } else {
      const users = await usersService.readMany(req.query)
      res.json(users)
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const user = await usersService.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}
