const formRegister = document.querySelector('form')
formRegister?.addEventListener('submit', async event => {
  event.preventDefault()
  const response = await fetch('/api/usuarios', {
    method: 'post',
    // @ts-ignore
    body: new URLSearchParams(new FormData(formRegister)),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  let token
  if (response.status === 201 && (token = response.headers.get('authorization'))) {
    const { payload: usuario } = await response.json()
    console.log('usuario:', JSON.stringify(usuario))
    localStorage.setItem('accessToken', token)
    window.location.href = '/'
  } else {
    const error = await response.json()
    console.log(JSON.stringify(error))
    alert('registration failed!')
  }
})