import express, { Router } from 'express'
import mongoose from 'mongoose'

import { Cart } from './models/Cart.js'
import { Product } from './models/Product.js'
import { tryCatch } from './utils.js'

await mongoose.connect('mongodb://localhost/coderhouse')

const app = express()
app.listen(8080, () => {
  console.log('conectado!')
})

app.use(express.json())

const carritosRouter = Router()
app.use('/api/carritos', carritosRouter)

carritosRouter.use(respuestasMejoradas)
carritosRouter.post('/', tryCatch(postController))
carritosRouter.get('/:cid', tryCatch(getController))
carritosRouter.put('/:cid/products/:pid', tryCatch(putController))
carritosRouter.use(manejadorDeErrores)

// controllers

async function postController(req, res) {
  const carrito = await Cart.create({})
  res.successfullPost(carrito)
}

async function getController(req, res) {
  const carrito = await Cart
    .findById(req.params.cid)
    .lean()
  res.successfullGet(carrito)
}

async function putController(req, res) {
  const carrito = await Cart.findById(req.params.cid)
  await carrito?.upsertProd(req.params.pid, req.body.cant)
  res.successfullPut(carrito?.toObject())
}

// middlewares

function manejadorDeErrores(error, req, res, next) {
  switch (error.message) {
    case 'carrito no encontrado':
      res.status(404); break
    default: res.status(500)
  }
  res.json({
    status: 'error',
    message: error.message
  })
}

function respuestasMejoradas(req, res, next) {
  res['successfullPost'] = function (payload) {
    res
      .status(201)
      .json({
        status: 'success',
        payload: JSON.parse(JSON.stringify(payload))
      })
  }
  res['successfullPut'] = function (payload) {
    res
      .status(200)
      .json({
        status: 'success',
        payload: JSON.parse(JSON.stringify(payload))
      })
  }
  res['successfullGet'] = function (payload) {
    res
      .status(200)
      .json({
        status: 'success',
        payload: JSON.parse(JSON.stringify(payload))
      })
  }
  res['successfullDelete'] = function () {
    res
      .status(204)
      .json({
        status: 'success',
      })
  }
  res['successfullLogout'] = function () {
    res
      .status(204)
      .json({
        status: 'success',
        message: 'logout OK'
      })
  }
  next()
}
