const moment = require('moment')

const hoy = moment()
//Colocar la fecha en formato YYYY-MM-DD
const fechaNacimiento = moment('1986-04-15', 'YYYY-MM-DD') //Prueba metiendo después el mes 200 !

console.log(hoy)
console.log(fechaNacimiento)

if (fechaNacimiento.isValid()) {
  console.log(`Desde mi nacimiento, han pasado ${hoy.diff(fechaNacimiento, 'days')} días`)
} else {
  console.error("No se puede proseguir ya que la fecha es inválida")
}