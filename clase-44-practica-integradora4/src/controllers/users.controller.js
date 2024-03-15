import { sessionsService } from '../services/sessions.service.js'
import { usersService } from '../services/users.service.js'

export async function registerUser(req, res, next) {
  try {
    const user = await usersService.register(req.body)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export async function authenticateUser(req, res, next) {
  const { username, password } = req.body
  try {
    const user = await sessionsService.authenticate({ username, password })
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

function getUserDto(user) {
  return {
    username: user.username,
    email: user.email,
    displayName: user.displayName
  }
}

export async function getCurrentUser(req, res, next) {
  try {
    const user = await usersService
      .usersRepository
      .readOne({ username: req.user.username })
    res['successfulGet'](getUserDto(user))
  } catch (error) {
    next(error)
  }
}
