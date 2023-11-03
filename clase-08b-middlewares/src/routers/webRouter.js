import { Router } from 'express'
import { upload } from '../middlewares/multer.js'

export const webRouter = Router()

webRouter.post('/uploads', upload.single('imagen'), (req, res) => {
  res.json({
    file: req.file
  })
})