import { Router } from 'express'

import * as ordenesController from '../controllers/ordenes.controller.js'

export const ordenesRouter = Router()

ordenesRouter.get('/:id?', ordenesController.handleGet)
ordenesRouter.post('/', ordenesController.handlePost)
ordenesRouter.put('/:id', ordenesController.handlePut)
ordenesRouter.delete('/:id', ordenesController.handleDelete)
