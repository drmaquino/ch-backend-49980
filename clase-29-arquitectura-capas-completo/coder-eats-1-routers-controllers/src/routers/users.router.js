import { Router } from 'express'
import { handleDelete, handleGet, handlePost, handlePut } from '../controllers/users.controller.js'

export const usersRouter = Router()

usersRouter.get('/:id?', handleGet)
usersRouter.post('/', handlePost)
usersRouter.put('/:id', handlePut)
usersRouter.delete('/:id', handleDelete)
