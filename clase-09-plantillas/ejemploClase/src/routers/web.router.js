import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
  res.render('index', { titulo: 'Inicio' })
})

webRouter.get('/login', (req, res) => {
  res.render('login', { titulo: 'Login' })
})

webRouter.get('/registro', (req, res) => {
  res.render('registro', { titulo: 'Registro', usaScript: true, script: 'registro' })
})

webRouter.get('/contacto', (req, res) => {
  res.render('contacto', { titulo: 'Contacto' })
})

const sponsors = [
  // { nombre: 'Mercado Libre' },
  // { nombre: 'Microsoft' },
  // { nombre: 'Oracle' },
]

webRouter.get('/sponsors', (req, res) => {
  res.render('sponsors', {
    titulo: 'Sponsors',
    haySponsors: sponsors.length > 0,
    sponsors
  })
})