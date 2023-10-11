class Evento {
  constructor({ id, nombre, lugar, precio, capacidad, fecha }) {
    this.id = id
    this.nombre = nombre
    this.lugar = lugar
    this.precio = precio
    this.capacidad = capacidad ?? 50
    this.fecha = fecha ?? new Date().toLocaleDateString()
    this.idsParticipantes = []
  }

  aplicarIncrementoGanancia(porcentaje) {
    this.precio += this.precio / 100 * porcentaje
  }
}

class TicketManager {
  static proxIdEvento = 1
  static porcentajeGanancia = 15;

  #eventos

  constructor() {
    this.#eventos = []
  }

  getEventos() {
    return this.#eventos
  }

  static getIdParaNuevoEvento() {
    return TicketManager.proxIdEvento++
  }

  agregarEvento(datosEvento) {
    const idEvento = TicketManager.getIdParaNuevoEvento()
    const evento = new Evento({ id: idEvento, ...datosEvento })
    evento.aplicarIncrementoGanancia(TicketManager.porcentajeGanancia)
    this.#eventos.push(evento)
    return evento
  }

  agregarUsuario(idEvento, idUsuario) {
    const evento = this.#eventos.find(e => e.id === idEvento)
    if (!evento) {
      throw new Error("Evento no encontrado")
    }

    const usuarioRegistrado = evento.idsParticipantes.includes(idUsuario)
    if (usuarioRegistrado) {
      throw new Error("Usuario ya registrado para asistir a este evento")
    }

    evento.idsParticipantes.push(idUsuario)

    return evento
  }

  ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
    const evento = this.#eventos.find(e => e.id === idEvento)
    if (!evento) {
      throw new Error("Evento no encontrado")
    }

    const newEvento = new Evento({
      ...evento,
      id: TicketManager.getIdParaNuevoEvento(),
      lugar: nuevaLocalidad,
      fecha: nuevaFecha,
    })
    this.#eventos.push(newEvento)
    return newEvento
  }
}

//Pruebas

const manejadorEventos = new TicketManager()

console.log('agregando Evento coder 1 para Argentina, precio: 200, para 50 participantes')
const eventoAgregado = manejadorEventos.agregarEvento({
  nombre: 'Evento coder 1',
  lugar: 'Argentina',
  precio: 200,
  capacidad: 20
})
console.log(eventoAgregado)

console.log('agregando al evento con id 1 la participacion del usuario con id 2')
const eventoConParticipanteAgregado = manejadorEventos.agregarUsuario(1, 2)
console.log(eventoConParticipanteAgregado)

console.log('creando una copia vacía del evento 1 pero en mexico y para el 2024')
const eventoCopiado = manejadorEventos.ponerEventoEnGira(1, 'Mexico', '30/11/2024')
console.log(eventoCopiado)

console.log(manejadorEventos.getEventos())