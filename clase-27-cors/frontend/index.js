import express from 'express'

const PORT = 5500

const app = express()
app.use('/', express.static('./www'))

app.listen(PORT, () => { console.log('conectado!') })

