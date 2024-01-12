
document.querySelector('#verUsuarios')?.addEventListener('click', async ev => {
  const response = await fetch('http://localhost:8080/api/usuarios')
  const usuarios = await response.json()
  console.log(usuarios)
})
