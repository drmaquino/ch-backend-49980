import { Orden } from '../models/Orden.js'
import { comerciosRepository } from '../repositories/comercios.repository.js'
import { ordenesRepository } from '../repositories/ordenes.repository.js'
import { usuariosRepository } from '../repositories/usuarios.repository.js'

class OrdenesService {
  async create({ idUsuario, idComercio, productos: idsProductos }) {

    const [usuario] = await usuariosRepository.readMany({ id: idUsuario })
    if (!usuario) throw new Error('no se puede crear la orden: usuario no encontrado')

    const [comercio] = await comerciosRepository.readMany({ id: idComercio }, { populateProductos: true })
    if (!comercio) throw new Error('no se puede crear la orden: comercio no encontrado')

    const productosDelPedido = idsProductos.map(pid => {
      const prod = comercio.productos.find(p => p.id === pid)
      if (!prod)
        throw new Error('no se puede crear la orden: ciertos productos no se encuentran en el comercio')
      return prod
    })

    const precio = productosDelPedido.reduce((p, c) => p + c.precio, 0)

    const orden = new Orden({ idUsuario, idComercio, productos: idsProductos, precio })
    const creada = await ordenesRepository.create(orden.dto())

    usuario.pedidos.push(creada.id)
    const usuarioActualizado = await usuariosRepository.updateOne({ id: usuario.id }, usuario)

    return creada
  }

  async completar(idOrden) {
    const orden = await ordenesRepository.readOne({ id: idOrden })
    if (!orden) throw new Error('orden no encontrada')

    if (orden.estado !== Orden.Estado.PENDIENTE) throw new Error('no se puede completar una orden ya ' + orden.estado)

    const ordenCompleta = new Orden({
      ...orden,
      estado: Orden.Estado.COMPLETADA
    })

    const ordenActualizada = await ordenesRepository.updateOne({ id: idOrden }, ordenCompleta.dto())

    return ordenActualizada
  }

  async cancelar(idOrden) {
    const orden = await ordenesRepository.readOne({ id: idOrden })
    if (!orden) throw new Error('orden no encontrada')

    if (orden.estado !== Orden.Estado.PENDIENTE) throw new Error('no se puede cancelar una orden ya ' + orden.estado)

    const ordenCancelada = new Orden({
      ...orden,
      estado: Orden.Estado.CANCELADA
    })

    const ordenActualizada = await ordenesRepository.updateOne({ id: idOrden }, ordenCancelada.dto())

    return ordenActualizada
  }
}

export const ordenesService = new OrdenesService()