// @ts-ignore
const socket = io()

const ulMensajes = document.querySelector('#mensajes')

document.querySelector('form')?.addEventListener('submit', event => {
  event.preventDefault()
  const cajita = document.querySelector('input')
  if (cajita?.value) {
    socket.emit('nuevoMensaje', cajita?.value)
    cajita.value = ''
  }
})

socket.on('mensajes', mensajes => {
  if (ulMensajes) {
    ulMensajes.innerHTML = ''
    for (const mensaje of mensajes) {
      const liMensaje = document.createElement('li')
      liMensaje.innerHTML = mensaje
      ulMensajes?.appendChild(liMensaje)
    }
  }
})
