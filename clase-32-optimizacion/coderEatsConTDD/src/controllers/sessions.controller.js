import { sessionsService } from '../services/sessions.service.js'

export async function handlePost(req, res, next) {
  try {
    const session = await sessionsService.login(req.body)
    res.status(201).json(session)
  } catch (error) {
    next(error)
  }
}
