import { Router } from 'express'

import * as comerciosController from '../controllers/comercios.controller.js'

export const comerciosRouter = Router()

comerciosRouter.get('/:id?', comerciosController.handleGet)
comerciosRouter.post('/', comerciosController.handlePost)
comerciosRouter.put('/:id', comerciosController.handlePut)
comerciosRouter.delete('/:id', comerciosController.handleDelete)
