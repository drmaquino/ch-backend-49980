const formNuevoPropietario = document.querySelector('form')

formNuevoPropietario?.addEventListener('submit', async event => {
  event.preventDefault()

  // @ts-ignore
  const formDataEncoded = new URLSearchParams(new FormData(formNuevoPropietario))

  try {
    const res = await fetch(
      '/api/propietarios',
      {
        method: 'POST',
        body: formDataEncoded,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      },
    )
    const resData = await res.json()

    if (res.status === 201) {
      window.location.href = `/propietarios/?id=${resData._id}`
    } else {
      console.log(resData)
    }
  } catch (err) {
    console.log(err.message)
  }
})
