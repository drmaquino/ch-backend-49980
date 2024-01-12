// RUTEO

// define los endpoints y nada mas

import express from 'express'
import { getController as listar, postController as registrar } from '../../controllers/users.controller.js'
import { autenticar } from '../../middlewares/autenticacion.js'
import { autorizar, soloRol } from '../../middlewares/autorizacion.js'
import { extraerFoto } from '../../middlewares/archivos.js'

export const usersRouter = express.Router()

usersRouter.post('/', autenticar, soloRol('admin'), extraerFoto, registrar)
usersRouter.get('/', autenticar, autorizar, listar)




// USUARIO -> presentacion(FE) <--HTTP--> ruteo(BE) --> negocio(BE) -> persistencia(BE)