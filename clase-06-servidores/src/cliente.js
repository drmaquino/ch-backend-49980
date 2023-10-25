// const domain = 'https://jsonplaceholder.typicode.com' // o host

// refinamiento por parametros de ruta (devuelve un solo resultado)
// const path = `/users`
// const parametro = '2'
// const path = `/users/${parametro}`

// refinamiento por parametros de consulta (devuelve una coleccion de resultados!)
// const query = 'website=anastasia.net'

const host = 'localhost'
const port = '8080'
// const path = '/estudiantes'
// const query = 'curso=backend'

const path = '/profes'
// const query = 'rol=tutor'
const query = 'nombre=alejandra'

const url = `http://${host}:${port}${path}?${query}`

console.log(`URL: ${url}`)

const response = await fetch(url)
const content = await response.json()
console.log(content)

export { }