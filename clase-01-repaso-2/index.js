// {
//   let i = 0

//   // codigo espagueti: mejor no usarlo! es dificil seguir lo scopes de las variables!
//   if (true) {
//     let i = 8
//     console.log(i)
//     if (true) {
//       console.log(i)
//       if (true) {
//         console.log(i) // da 8, aun no lo reasigne, y el valor inicial es el de la linea 5
//         i = 1
//         console.log(i) // da 1
//       }
//       console.log(i)
//     }
//     console.log(i)
//   }
//   console.log(i)
// }

function nombre(param1, param2, /* ... */) {
  // instruccion 1
  // instruccion 2
  // instruccion 3
  // instruccion 4
  // opcional: return ...
}

const flecha = (param1, param2, /*...*/) => {
  /* instrucciones */
  /* instrucciones */
  /* instrucciones */
  /* instrucciones */
  /* instrucciones */
  // mmmmmmm me conviene usar una funcion comun....
}

const flecha2 = (param1, param2, /*...*/) => /* expresion que se devuelve automaticamente */ 1

// expresiones:
/*
1 -> 1
1 + 2 -> 3
const num = 3
num -> 3
const f = () => 4
f() -> 4
const g = (n) => n + 5
g(1) -> 6
const isPositivo = n => !isNaN(n) && n > 0

isPositivo(5) -> !isNaN(5) && 5 > 0 -> !false && 5 > 0 -> true && 5 > 0 -> 5 > 0 -> true -> true
*/

// parametros vs argumentos

// function getNombre() {
//   // @ts-ignore
//   return document.querySelector('#inputNombre').value
// }

// // nombre es el parametro, es una variable que recibe el argumento
// function saludar(nombre) {
//   // console.log('"hola, ' + nombre + '"')
//   console.log(`"hola, ${getNombre()}"`)
// }

// saludar('marian') // 'marian' es el argumento

// function saludarConFormato(mensaje, formateador) {
//   console.log(formateador(mensaje))
// }

// saludarConFormato('hola, marian', frase => `${frase}!!!`)

// saludarConFormato('hola, marian', frase => `...${frase}... u.u`)

// let num = 1

// function contar() {
//   num++
// }

// contar()
// contar()
// contar()

// console.log(num)

// let num = 1

// // funcion pura: no modifica nada que se encuentre fuera de su alcance (scope)
// function contar(elNumero) {
//   return elNumero + 1
// }

// num = contar(num)
// num = contar(num)
// num = contar(num)

// console.log(num)

// function crearMultiplicador(factor) {
//   return num => num * factor
// }

// const duplicar = crearMultiplicador(2)
// const triplicar = crearMultiplicador(3)

// console.log(duplicar(5))
// console.log(triplicar(3))

// function crearClausuraDeIncrementoDoble() {
//   let doblador = 2 // contexto de la funcion
//   return function (valor) {
//     return valor * doblador
//   }
// }

// const f = crearClausuraDeIncrementoDoble() // devuelve la funcion junto con su contexto para que funcione bien
// console.log(f(5))

// Definir clase Contador
// La clase se creará con un nombre, representando al responsable del contador.
// El contador debe inicializarse en 0
// Debe existir una variable estática que funcione como contador global de todas las instancias de contador creadas.
// Definir el método getResponsable, el cual debe devolver el responsable de dicho contador.
// Definir el método contar, el cual debe incrementar, tanto su cuenta individual, como la cuenta global.
// Definir el método getCuentaIndividual, el cual debe devolver sólo la cuenta individual del contador
// Definir el método getCuentaGlobal, el cual debe devolver la variable estática con el conteo global.
// Realizar prueba de individualidad entre las instancias.

class Contador {
  cuenta = 0
  static cuenta = 0
  constructor(nombre) {
    this.nombre = nombre
  }
  getResponsable() { return this.nombre }
  contar() { this.cuenta++; Contador.cuenta++ }
  getCuentaIndividual() { return this.cuenta }
  getCuentaGlobal() { return Contador.cuenta }
}

const c1 = new Contador('gonza')
const c2 = new Contador('facu')
c1.contar()
c1.contar()
c1.contar()
c2.contar()
c2.contar()
console.log(c1.getResponsable())
console.log(c2.getResponsable())

console.log(c1.getCuentaIndividual())
console.log(c2.getCuentaIndividual())

console.log(c1.getCuentaGlobal())
console.log(c2.getCuentaGlobal())