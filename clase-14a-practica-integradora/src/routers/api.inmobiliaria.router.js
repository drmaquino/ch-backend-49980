import { Router, json, urlencoded } from 'express'
import { propietariosManager } from '../services/propietarios.manager.js'
import { propiedadesManager } from '../services/propiedades.manager.js'
import { extract } from '../middlewares/files.js'

export const apiInmobiliariaRouter = Router()

apiInmobiliariaRouter.use(json())
apiInmobiliariaRouter.use(urlencoded({ extended: true }))

apiInmobiliariaRouter.post('/propietarios', async (req, res) => {
  try {
    const datosPropietario = req.body
    const propietario = await propietariosManager.registrar(datosPropietario)
    res.status(201).json(propietario)
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
})

apiInmobiliariaRouter.post('/propietarios/:idPropietario/propiedades', extract('fotoProp'), async (req, res) => {
  const idPropietario = req.params.idPropietario
  try {
    const propiedad = await propiedadesManager.cargar(idPropietario, req.body, req.file)
    res.status(201).json(propiedad)
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
})

// estos no se usan desde la web ----------------------------------

apiInmobiliariaRouter.get('/propietarios', async (req, res) => {
  try {
    const propietarios = await propietariosManager.consultar()
    res.json(propietarios)
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
})

apiInmobiliariaRouter.get('/propiedades', async (req, res) => {
  try {
    const propiedades = await propiedadesManager.consultar()
    res.json(propiedades)
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
})