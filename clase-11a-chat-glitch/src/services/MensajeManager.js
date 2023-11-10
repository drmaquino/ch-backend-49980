import fs from 'fs/promises'

class MensajeManager {
  constructor(ruta) {
    this.ruta = ruta
  }

  async agregar(mensaje) {
    const mensajes = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    mensajes.push(mensaje)
    await fs.writeFile(this.ruta, JSON.stringify(mensajes, null, 2))
  }

  async obtenerTodos() {
    return JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
  }

  async borrarTodos() {
    await fs.writeFile(this.ruta, '[]')
  }

}

export const mensajeManager = new MensajeManager('./db/mensajes.json')