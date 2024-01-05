import mongoose from 'mongoose'
import express from 'express'

import { PORT, CNX_STR } from './config/config.js'

//@ts-ignore
await mongoose.connect(CNX_STR)
console.log(`conectado a DB en ${CNX_STR}`)

const app = express()

app.listen(PORT, () => { console.log(`escuchando peticiones en puerto :${PORT}`) })

