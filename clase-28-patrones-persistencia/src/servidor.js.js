import express from 'express'
import { apiRouter } from './routers/apiRouter.js'

const app = express()
app.listen(8080)

app.use('/api', apiRouter)