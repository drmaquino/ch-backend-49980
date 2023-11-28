const formNuevaPropiedad = document.querySelector('form')

const idPropietario = new URLSearchParams(window.location.search).get('id')

if (idPropietario) {
  formNuevaPropiedad?.addEventListener('submit', async event => {
    event.preventDefault()

    // @ts-ignore
    const formData = new FormData(formNuevaPropiedad)

    try {
      const res = await fetch(
        `/api/propietarios/${idPropietario}/propiedades`,
        {
          method: 'POST',
          body: formData
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

