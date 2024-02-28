import { Router } from 'express'

import * as adopcionesController from '../controllers/adopciones.controller.js'

export const adopcionesRouter = Router()

adopcionesRouter.get('/:id?', adopcionesController.handleGet)
adopcionesRouter.post('/', adopcionesController.handlePost)
adopcionesRouter.put('/:id', adopcionesController.handlePut)
adopcionesRouter.delete('/:id', adopcionesController.handleDelete)
