import { Router } from 'express'

import * as mascotasController from '../controllers/mascotas.controller.js'
import { extractFile } from '../middlewares/fileExtractor.js'

export const mascotasRouter = Router()

mascotasRouter.get('/:id?', mascotasController.handleGet)
mascotasRouter.post('/', extractFile('foto'), mascotasController.handlePost)
mascotasRouter.put('/:id', mascotasController.handlePut)
mascotasRouter.delete('/:id', mascotasController.handleDelete)
