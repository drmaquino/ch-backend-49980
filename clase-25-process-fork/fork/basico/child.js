// @ts-nocheck
process.on('message', msg => {
    console.log(`mensaje del padre: ${msg}`)
    process.send('hola, pa')
    process.exit()
})

process.send('listo')
