const form = document.querySelector('form')
const input = document.querySelector('input')
const ulMensajes = document.querySelector('ul')

let username

Swal.fire({
  title: 'CoderChat',
  input: 'text',
  text: 'Ingrese su nombre:',
  inputValidator: value => {
    return !value && 'debe ingresar un nombre!'
  },
  allowOutsideClick: false,
}).then(result => {
  username = result.value
  document.querySelector('input')?.focus()
  empezarAChatear()
})

function empezarAChatear() {
  const socket = io({
    auth: {
      username
    }
  })

  form?.addEventListener('submit', event => {
    event.preventDefault()
    if (input) {
      enviarMensaje(username, input.value)
      input.value = ''
    }
  })

  function enviarMensaje(username, text) {
    socket.emit('mensaje', {
      username,
      text
    })
  }

  socket.on('mensajes', msgs => {
    if (ulMensajes) {
      ulMensajes.innerHTML = ''
      for (const { username, text } of msgs) {
        const li = document.createElement('li')
        li.innerHTML = `${username}: ${text}`
        ulMensajes?.appendChild(li)
      }
    }
  })

  socket.on('nuevoUsuario', nombreUsuario => {
    Swal.fire({
      text: `${nombreUsuario} está en linea`,
      toast: 'true',
      position: 'top-right'
    })
  })

  socket.on('usuarioDesconectado', nombreUsuario => {
    Swal.fire({
      text: `${nombreUsuario} se ha desconectado`,
      toast: 'true',
      position: 'top-right'
    })
  })
}