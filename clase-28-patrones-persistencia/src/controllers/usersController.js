import { usersService } from '../services/usersService.js'

export async function postController(req, res, next) {
  try {
    const userData = req.body
    const user = await usersService.registrar(userData)
    res.json(user)
  } catch (error) {
    next(error)
  }
}