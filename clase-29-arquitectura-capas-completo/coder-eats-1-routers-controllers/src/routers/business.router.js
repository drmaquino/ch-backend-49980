import { Router } from 'express'
import { handleDelete, handleGet, handlePost, handlePut } from '../controllers/business.controller.js'

export const businessRouter = Router()

businessRouter.get('/:id?', handleGet)
businessRouter.post('/', handlePost)
businessRouter.put('/:id', handlePut)
businessRouter.delete('/:id', handleDelete)
