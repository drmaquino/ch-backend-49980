const ordenes = [
  { name: 'Pepperoni', size: 'small', price: 10, quantity: 10, date: new Date().toLocaleString() },
  { name: 'Pepperoni', size: 'small', price: 10, quantity: 20, date: new Date().toLocaleString() },
  { name: 'Pepperoni', size: 'medium', price: 11, quantity: 20, date: new Date().toLocaleString() },
  { name: 'Pepperoni', size: 'medium', price: 11, quantity: 30, date: new Date().toLocaleString() },
  { name: 'Pepperoni', size: 'large', price: 12, quantity: 15, date: new Date().toLocaleString() },
  { name: 'Pepperoni', size: 'large', price: 12, quantity: 25, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'small', price: 13, quantity: 11, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'small', price: 13, quantity: 21, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'medium', price: 14, quantity: 14, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'medium', price: 14, quantity: 24, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'large', price: 15, quantity: 21, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'large', price: 15, quantity: 31, date: new Date().toLocaleString() },
  { name: 'Vegan', size: 'small', price: 16, quantity: 31, date: new Date().toLocaleString() },
  { name: 'Vegan', size: 'small', price: 16, quantity: 41, date: new Date().toLocaleString() },
  { name: 'Vegan', size: 'medium', price: 17, quantity: 5, date: new Date().toLocaleString() },
  { name: 'Vegan', size: 'medium', price: 17, quantity: 15, date: new Date().toLocaleString() },
]

const subresult1 = ordenes.filter(o => o.size === 'medium')
const subresult2 = Object.groupBy(subresult1, ({ name }) => name)
// console.log(subresult2)
for (const name in subresult2) {
  subresult2[name] = { name: name, cantOrdenes: subresult2[name].length }
}
console.log(subresult2)
