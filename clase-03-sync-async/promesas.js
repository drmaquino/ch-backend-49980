function randPositive(max) {
  return 1 + Math.floor(Math.random() * max)
}

new Promise((resolve, reject) => {
  let pizzaOk = false
  let heladoOk = false

  console.log('pido la pizza')
  setTimeout(() => {
    console.log('llegó la pizza')
    pizzaOk = true
    if (pizzaOk && heladoOk) resolve('ya está toda la comida (1ro llegó el helado)')
  }, 1000 * randPositive(3))

  console.log('pido el helado')
  setTimeout(() => {
    console.log('llegó el helado')
    heladoOk = true
    if (pizzaOk && heladoOk) resolve('ya está toda la comida (1ro llegó la pizza)')
  }, 1000 * randPositive(3))
})
  .then((resultadoDeLaPromesa) => {
    console.log(resultadoDeLaPromesa)
    console.log('llamo a mis amigxs')
    setTimeout(() => {
      console.log('llegó la gente')
    }, 1000 * Math.floor(Math.random() * 3 + 1))
  })
