const formNuevaPropiedad = document.querySelector('form')

const idPropietario = new URLSearchParams(window.location.search).get('id')

if (idPropietario) {
  formNuevaPropiedad?.addEventListener('submit', async event => {
    event.preventDefault()

    // @ts-ignore
    const formDataEncoded = new URLSearchParams(new FormData(formNuevaPropiedad))

    try {
      const res = await fetch(
        `/api/propietarios/${idPropietario}/propiedades`,
        {
          method: 'POST',
          body: formDataEncoded,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        },
      )
      const resData = await res.json()

      if (res.status === 201) {
        window.location.reload()
      } else {
        console.log(resData)
      }
    } catch (err) {
      console.log(err.message)
    }
  })
}

