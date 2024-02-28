import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/autenticacion.config.js'
import { ErrorAutenticacionFallida } from '../models/errors/AutenticacionFallida.error.js'

class Criptografia {
  hashear(dato) {
    return bcrypt.hashSync(dato, 10)
  }

  comparar(actual, almacenada) {
    return bcrypt.compareSync(actual, almacenada)
  }

  generarToken(dato, ttl = '24h') {
    return jwt.sign({ dato }, JWT_SECRET, { expiresIn: ttl })
  }

  decodificarToken(token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET)
      return payload['dato']
    } catch (error) {
      throw new ErrorAutenticacionFallida()
    }
  }
}

export const criptografiador = new Criptografia()