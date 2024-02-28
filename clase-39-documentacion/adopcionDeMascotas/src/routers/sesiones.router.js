import { Router } from 'express'

import * as sesionesController from '../controllers/sesiones.controller.js'

export const sesionesRouter = Router()

sesionesRouter.get('/current', sesionesController.handleGetCurrent)
sesionesRouter.post('/', sesionesController.handlePost)
sesionesRouter.delete('/', sesionesController.handleDelete)
