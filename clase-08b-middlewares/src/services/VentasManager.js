import { Venta } from '../models/Venta.js'

export class VentasManager {
  constructor() {
    this.ventas = [{
      monto: 1_000
    }]
  }

  getAll() {
    return this.ventas
  }

  add(datosVenta) {
    const nueva = new Venta(datosVenta)
    this.ventas.push(nueva)
    return nueva
  }
}
