// function callback (event) {
//   event.preventDefault()
//   alert('hola mundo')
// }

// document.querySelector('#aaa')?.addEventListener('click', event => {
//   event.preventDefault()
//   alert('hola mundo')
// })

// const edades = [1, 2, 3, 4, 5]

// function callback(elem) {
//   return elem + 1
// }

// const edadesIncrementadas = edades.map(function (e) { return e + 1})
// const edadesIncrementadas = edades.map(e => e + 1)

// function saludarConEstilo(mensaje, estilizar) {
//   console.log(estilizar(mensaje))
// }

// saludarConEstilo('hola', txt => `¡¡¡${txt}!!!`)

// ---------------------------------------------------------------

// /**
//  * divide dos numeros y devuelve el resultado entero y su resto
//  * @param {number} dividendo 
//  * @param {number} divisor 
//  * @returns {{ cociente: number, resto: number }}
//  * @throws {Error}
//  */
// function divisionEntera(dividendo, divisor) {

//   // LANZA UN ERROR
//   // devuelve lo que salió mal
//   // throw interrumpe el flujo normal del la funcion.
//   if (divisor === 0) throw new Error('no se puede dividir por cero')

//   const cociente = Math.floor(dividendo / divisor)
//   const resto = dividendo % divisor

//   // DEVUELVE UN RESULTADO
//   // return tambien interrumpe el flujo normal del la funcion.
//   return {
//     cociente,
//     resto
//   }

//   console.log('esto no se muestra nunca!!')
// }

// try {
//   const result = divisionEntera(10, 0)
//   console.log(result)
// }
// catch (error) {
//   console.log(error.message)
// }

// const resultadoCorrecto = divisionEntera(10, 3)
// console.log(resultadoCorrecto)

// -------------------------------------------------------


function divisionEntera(dividendo, divisor, callback) {

  if (divisor === 0) return callback(new Error('no se puede dividir por cero'), null)

  const cociente = Math.floor(dividendo / divisor)
  const resto = dividendo % divisor

  return callback(null, { cociente, resto })
}

function manejarResultadoDivision(error, result) {
  if (error) {
    console.log(error.message)
  } else {
    console.log(result)
  }
}

divisionEntera(10, 0, manejarResultadoDivision)
divisionEntera(10, 3, manejarResultadoDivision)
