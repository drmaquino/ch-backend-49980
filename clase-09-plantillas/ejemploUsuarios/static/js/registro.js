const formRegistro = document.querySelector('form')
formRegistro?.addEventListener('submit', event => {
  event.preventDefault()
  const datosPersona = Object.fromEntries(new FormData(formRegistro).entries())
  console.log(datosPersona)
  fetch('/api/personas', {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosPersona),
  })
    .then(res => res.json()).then(result => {
      if (result.status === 'ok') {
        alert('registrado!')
      } else {
        alert('error al registrar la persona: ' + result.error)
      }
    })
    .catch(error => {
      alert('error al enviar el formulario: ' + error.message)
    })
})