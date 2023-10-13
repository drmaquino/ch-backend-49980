function sleep(secs, payload = true) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(payload)
    }, 1000 * secs)
  })
}

function randPositive(max) {
  return 1 + Math.floor(Math.random() * max)
}

async function iniciarSimulacion(nombre) {
  await sleep(randPositive(3))
  console.log(`${nombre} se levanta`)
  await sleep(randPositive(3))
  console.log(`${nombre} se va al trabajo`)
  await sleep(randPositive(6))
  console.log(`${nombre} vuelve a cenar`)
  await sleep(randPositive(2))
  console.log(`${nombre} se va a dormir`)
}

iniciarSimulacion('pepe')
iniciarSimulacion('marce')
iniciarSimulacion('lala')