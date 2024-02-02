import { businessesService } from '../services/businesses.service.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const business = await businessesService.readOne({ _id: req.params.id })
      res.json(business)
    } else {
      const businesses = await businessesService.readMany(req.query)
      res.json(businesses)
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const business = await businessesService.create(req.body)
    res.status(201).json(business)
  } catch (error) {
    next(error)
  }
}
