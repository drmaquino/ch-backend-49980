import { Router } from 'express'

import * as usuariosController from '../controllers/usuarios.controller.js'

export const usuariosRouter = Router()

usuariosRouter.get('/:id?', usuariosController.handleGet)
usuariosRouter.post('/', usuariosController.handlePost)
usuariosRouter.put('/:id', usuariosController.handlePut)
usuariosRouter.delete('/:id', usuariosController.handleDelete)
