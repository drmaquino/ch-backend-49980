import { usersDao } from '../daos/index.js'
import { UsersRepository, usersRepository } from '../repositories/users.repository.js'
import { usersService } from '../services/users.service.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      res.json(await usersDao.readOne({ _id: req.params.id }))
    } else {
      res.json(await usersDao.readMany(req.query))
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
