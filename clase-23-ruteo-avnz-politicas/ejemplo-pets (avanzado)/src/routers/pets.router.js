import { Router } from 'express'
import { petManager } from '../models/Pet.js'

const catchNext = fn => {
  return async (req, res, next) => {
    return fn(req, res, next).catch(next)
  }
}

export const router = Router()

router.param('pet', (req, res, next, pet) => {
  req['pet'] = pet
  next()
})

router.get('/:pet([a-z]+)', catchNext(async (req, res) => {
  const pet = await petManager.findOne({ name: req['pet'] })
  res['successfullGet'](pet)
}))

router.post('/', catchNext(async (req, res) => {
  const newPet = await petManager.create(req.body)
  res['successfullPost'](newPet)
}))

router.put('/:pet([a-z]+)', catchNext(async (req, res) => {
  const updatedPet = await petManager.findOneAndUpdate(
    { name: req['pet'] },
    { adopted: true },
    { new: true }
  )
  res['successfullPut'](updatedPet)
}))

router.all('*', (req, res) => {
  res.json({
    status: 'error',
    message: 'endpoint does not exist'
  })
})

router.use((error, req, res, next) => {
  switch (true) {
    case error.message.startsWith('ERROR_NOT_FOUND'):
      res.status(404); break
    case error.message.startsWith('ERROR_NOT_UNIQUE'):
      res.status(409); break
    case error.message.split(' ').includes('validation'):
      res.status(400); break
    default:
      res.status(500)
  }

  res.json({
    status: 'error',
    message: error.message,
  })
})
