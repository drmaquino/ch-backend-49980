import mongoose from 'mongoose'
import { CNX_STR } from './config/mongodb.config.js'
import { PORT } from './config/server.config.js'
import { app } from './app/app.js'

await mongoose.connect(CNX_STR)
console.log(`conectado a base de datos en '${CNX_STR}'`)

app.listen(PORT, () => { console.log(`escuchando en puerto ${PORT}`) })