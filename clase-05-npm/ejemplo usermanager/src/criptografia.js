const crypto = require('crypto')

function encriptar(valor, salt) {
  return crypto.createHmac('sha256', salt).update(valor).digest('hex')
}

function crearSalt() {
  return crypto.randomBytes(128).toString('base64')
}

exports.encriptar = encriptar
exports.crearSalt = crearSalt