import express from 'express'
import { User } from './models/index.js'
import users from './users.json' assert { type: 'json' }
import { engine } from 'express-handlebars'

await User.insertMany(users)

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.get('/', async (req, res, next) => {

    const criterioDeBusqueda = { gender: 'Female' }

    const opcionesDePaginacion = {
        limit: req.query.limit || 5, // tamaño de pagina: 5 por defecto
        page: req.query.page || 1, // devuelve la primera pagina por defecto
        lean: true // para que devuelva objetos literales, no de mongoose
    }

    // @ts-ignore
    let result = await User.paginate(criterioDeBusqueda, opcionesDePaginacion)

    console.log(result)

    const context = {
        pageTitle: 'paginado',
        hayDocs: result.docs.length > 0,
        docs: result.docs,
        limit: result.limit,
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        nextPage: result.nextPage,
        hasPrevPage: result.hasPrevPage,
        prevPage: result.prevPage,
        pagingCounter: result.pagingCounter,
    }

    res.render('index', context)
})

process.on('exit', async () => {
    await User.deleteMany({})
})

app.listen(8080)