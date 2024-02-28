import { CredencialesLogin } from '../models/inputs/CredencialesLogin.input.js'
import { autenticacionService } from '../services/autenticacion.service.js'
import { criptografiador } from '../services/criptografia.service.js'

export async function handleGetCurrent(req, res, next) {
  try {
    const token = req.signedCookies.token
    const sesion = criptografiador.decodificarToken(token)
    res.json(sesion)
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const token = await autenticacionService.login(new CredencialesLogin(req.body))
    res.cookie('token', token, { signed: true, httpOnly: true })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    res.clearCookie('token', { signed: true, httpOnly: true })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}