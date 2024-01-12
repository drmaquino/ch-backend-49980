// RUTEO

// define los endpoints y nada mas

import express from 'express'

import { autenticar } from '../../middlewares/autenticacion.js'
import { extraerFoto } from '../../middlewares/archivos.js'
import { getController as listar, postController as cargar, deleteController as eliminar } from '../../controllers/juguetes.controller.js'
import { soloRol } from '../../middlewares/autorizacion.js'

export const juguetesRouter = express.Router()

juguetesRouter.use(express.json())

juguetesRouter.post('/', autenticar, soloRol('admin'), extraerFoto, cargar)
juguetesRouter.delete('/', autenticar, soloRol('admin'), eliminar)
juguetesRouter.get('/', listar)
