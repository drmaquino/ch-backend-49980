import { Router } from 'express'
import { propietariosManager } from '../services/propietarios.manager.js'
import { propiedadesManager } from '../services/propiedades.manager.js'

export const webInmobiliariaRouter = Router()

webInmobiliariaRouter.get('/', async (req, res) => {
  res.redirect('/propietarios')
})

webInmobiliariaRouter.get('/registro', async (req, res) => {
  res.render('registroPropietarios.handlebars', { titulo: 'Inmobiliaria' })
})

webInmobiliariaRouter.get('/propietarios', async (req, res) => {
  const idPropietario = req.query.id
  if (idPropietario) {
    const propietario = await propietariosManager.consultarUno(idPropietario)
    if (propietario) {
      res.render('perfilPropietario.handlebars', {
        titulo: 'Mis datos',
        propietario,
        tienePropiedades: propietario.propiedades.length > 0,
        propiedades: propietario.propiedades
      })
    } else {
      res.render('propietarioNotFound.handlebars', { titulo: 'Not Found' })
    }
  } else {
    const propietarios = await propietariosManager.consultar()
    res.render('propietarios.handlebars', {
      titulo: 'Propietarios',
      hayPropietarios: propietarios.length > 0,
      propietarios,
    })
  }
})

webInmobiliariaRouter.get('/propiedades', async (req, res) => {
  const idPropiedad = req.query.id
  if (idPropiedad) {
    const propiedad = await propiedadesManager.consultarUna(idPropiedad)
    if (propiedad) {
      res.render('propiedad.handlebars', {
        titulo: 'Propiedad',
        propiedad,
      })
    } else {
      res.render('propiedadNotFound.handlebars', { titulo: 'Not Found' })
    }
  } else {
    const propiedades = await propiedadesManager.consultar()
    res.render('propiedades.handlebars', {
      titulo: 'Propiedades',
      hayPropiedades: propiedades.length > 0,
      propiedades,
    })
  }
})
