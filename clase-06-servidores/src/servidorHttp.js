import http from 'http'

const estudiantes = [
  { id: 1, nombre: 'eduardo', curso: 'backend' },
  { id: 2, nombre: 'mauro', curso: 'backend' },
  { id: 3, nombre: 'emiliano', curso: 'backend' },
]

const profes = [
  { id: 1, nombre: 'marian', rol: 'profe' },
  { id: 2, nombre: 'leandro', rol: 'tutor' },
  { id: 3, nombre: 'franco', rol: 'tutor' },
  { id: 4, nombre: 'mario', rol: 'tutor' },
  { id: 5, nombre: 'samir', rol: 'tutor' },
  { id: 6, nombre: 'alejandra', rol: 'tutor' },
]

const server = http.createServer((request, response) => {
  const { url, method } = request
  console.log(method, url)
  const path = url?.split('?')[0]

  if (method === 'GET') {
    if (path === '/estudiantes') {
      response.end(JSON.stringify({ estudiantes }))
    } else if (path === '/profes') {
      const query = url?.split('?')[1]
      const atributo = query?.split('=')[0]
      const valor = query?.split('=')[1]
      response.end(JSON.stringify({
        profes:
          profes.filter(p => p[atributo] === valor)
      }))
    } else if (path === '/') {
      response.end(`<h1>Aguante el Backend!</h1>`)
    }
  }
})

server.listen(8080, () => {
  console.log('conectado al puerto 8080!')
})