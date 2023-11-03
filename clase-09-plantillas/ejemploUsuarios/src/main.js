import express from 'express'
import { webRouter } from './routers/web.router.js'

import { engine } from 'express-handlebars'
import { apiRouter } from './routers/api.router.js'

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('/static', express.static('./static'))

app.use('/', webRouter)
app.use('/api', apiRouter)

app.listen(8080, () => { console.log('conectado!') })