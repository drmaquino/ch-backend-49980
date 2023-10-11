// const p1 = { nombre: 'p1', edad: 25 }
// const p2 = { nombre: 'p2', edad: 26 }
// const p3 = { nombre: 'p3', edad: 29 }
// const p4 = { nombre: 'p4', edad: 22 }
// const p5 = { nombre: 'p5', edad: 28 }

// const personas = [p1, p2, p3, p4, p5]

// let hay = false
// for (const p of personas) {
//   if (p === p2) {
//     hay = true
//     break
//   }
// }

// const pp = { hola: 'mundo' }
// const hay = personas.includes(pp)

// console.log(hay)

//-------------------------------------------------

// const texto = 'hola como estas, todo bien, me llamo marian, me gusta desayunar al mediodia'
// console.log(texto.split(' ').includes('desayu'))
// console.log(texto.split(' ').includes('cenar'))
// console.log(texto.includes('desay'))
// console.log(texto.split(' '))
// console.log(texto.split(''))

// console.log(personas.map(p => p.edad))
// console.log(personas.map(p => p.edad).includes(40))

// ES8

// const auto = {
//   marca: 'ford',
//   modelo: 'fiesta',
//   puertas: 5
// }

// for (const key in auto) {
//   console.log(key)
// }

// for (const key in auto) {
//   console.log(auto[key])
// }

// for (const key in auto) {
//   console.log([key, auto[key]])
// }

// console.log(Object.keys(auto))
// console.log(Object.values(auto))
// console.log(Object.entries(auto))

// const personas = [
//   { nombre: 'p1', edad: 25 },
//   { nombre: 'p2', edad: 26 },
//   { nombre: 'p3', edad: 29 },
//   { nombre: 'p4', edad: 22 },
//   { nombre: 'p5', edad: 28 },
// ]

// for (const [indice, persona] of Object.entries(personas)) {
//   console.log(`en pos ${indice} esta ${persona.nombre}`)
// }

// for (let i = 0; i < personas.length; i++) {
//   const persona = personas[i]
//   console.log(`en pos ${i} esta ${persona.nombre}`)
// }

// async/await

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(jsObj => console.log(jsObj))

// async function f() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//   const jsObj = await response.json()
//   console.log(jsObj)
// }

// f()

// ES9 -----------------------------
// spread

// const nums = [1, 2, 3, 4, 5]

// function sumar(n1, n2, n3, n4, n5) {
//   console.log(n1 + n2 + n3 + n4 + n5)
// }

// sumar(nums[0], nums[1], nums[2], nums[3], nums[4])
// // sumar(...nums)

// rest

// function sumar(n1, n2, ...resto) {
//   console.log(n1 + n2)
//   console.log(resto)
// }

// sumar(1, 2, 3, 4, 5, 6, 7, 8, 9)

// ES10

// const mensaje = `               hola           mundo         `
// console.log(mensaje.trim()) // 'hola           mundo'

// const arrayAnidado = [1, 32, 4, 5, 6, [1, 4, 5, 1], [3411, 4, 3]]

// console.log(arrayAnidado.flat()) // [ 1, 32, 4, 5, 6, 1, 4, 5, 1, 3411, 4, 3]

// ES11

// nullish coalescense

// const apodo = document.querySelector('#inputNombre').value || 'anonimo'
// const cantidad = parseInt(document.querySelector('#inputCantidad').value || '10')

// const apodo = document.querySelector('#inputNombre').value ?? 'anonimo'
// const cantidad = parseInt(document.querySelector('#inputCantidad').value ?? '10')

// miembros de clase privados

// class Usuario {
//   username
//   #password

//   constructor(username, password) {
//     this.username = username
//     this.#password = password
//   }

//   mostrarPassword() { console.log(this.#password) }
// }

// const u = new Usuario('marian@mail.com', 'abc123')

// console.log(u)
// // console.log(u.#password) // no se puede
// u.mostrarPassword()

class Persona {
  nombre
  #edad

  constructor(unNombre, unaEdad) {
    this.nombre = unNombre
    this.setEdad(unaEdad)
  }

  // getEdad() { // el famoso "GETTER"
  //   return this.#edad
  // }

  get edad() {
    return this.#edad
  }

  // setEdad(valor) { // el famoso "SETTER"
  //   if (Number.isInteger(valor) && valor >= 0)
  //     this.#edad = valor
  // }

  set edad(valor) { // el famoso "SETTER"
    if (Number.isInteger(valor) && valor >= 0)
      this.#edad = valor
  }
}

const p = new Persona('marian', 37)

console.log(p)

// p.setEdad(-10)
p.edad = -10

// console.log(p.getEdad())
console.log(p.edad)


