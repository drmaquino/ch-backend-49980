import assert from 'assert/strict'
import supertest from 'supertest'

import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../src/config/config.js'

const baseUrl = 'http://localhost:8080'

// function supertest(baseUrl) {
//   return {
//     post: function (path) {
//       return {
//         send: async function (pojo) {
//           const response = await fetch(`${baseUrl}${path}`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(pojo)
//           })
//           const body = await response.json()
//           return { body }
//         }
//       }
//     },
//     get: async function (path) {
//       const response = await fetch(`${baseUrl}${path}`)
//       const body = await response.json()
//       return { body }
//     }
//   }
// }

const requester = supertest(baseUrl)


const mockLoginCredentials = {
  "username": "marianito",
  "password": "123",
}

const mockCreateUserDto = {
  ...mockLoginCredentials,
  "email": "marianito@profe.com",
  "displayName": "maru"
}

describe('Pruebas funcionales', () => {

  before(async () => {
    await mongoose.connect(MONGODB_CNX_STR)
  })

  after(async () => {
    await mongoose.disconnect()
  })

  describe('Usuarios', () => {

    beforeEach(async () => {
      await mongoose.connection.collection('users').drop()
    })

    after(async () => {
      await mongoose.connection.collection('users').drop()
    })

    describe('Registrar usuario', () => {

      describe('con datos válidos', () => {
        it('crear un usuario con un nuevo id ', async () => {
          const { body } = await requester
            .post('/api/users')
            .send(mockCreateUserDto)

          assert.ok(body?.payload?._id)
        })
      })

      describe('con datos válidos y foto', () => {
        it('crear un usuario con un nuevo id ', async () => {
          const { body } = await requester
            .post('/api/users')
            .field('username', 'marito')
            .field('password', 'abc')
            .field('email', 'mar@ito.com')
            .field('displayName', 'marito')
            .attach('foto', './test/static/img/lafoto.jpg')

          assert.ok(body?.payload?._id)
        })
      })
    })

    describe('Autenticar usuario', () => {
      describe('con credenciales válidas', () => {
        it('crear una sesión en forma de JWT', async () => {

          await requester
            .post('/api/users')
            .send(mockCreateUserDto)

          const { body, headers } = await requester
            .post('/api/sessions')
            .send(mockLoginCredentials)

          assert.equal(body.status, 'success')
          const cookies = headers['set-cookie'][0]
          const arrayDeCookiesStr = cookies.split(' ')
          const arrayDeCookiesKV = arrayDeCookiesStr.map(str => str.split('='))
          const authCookie = arrayDeCookiesKV.find(kv => kv[0] === 'authorization')
          assert.ok(authCookie)
          assert.ok(authCookie[1])
        })
      })
    })

    describe('Ver perfil de usuario', () => {
      describe('estando logueado', () => {
        it('devuelve la info del usuario logueado', async () => {

          const requester = supertest.agent(baseUrl)

          const { body: { payload: { _id: registeredId } } } = await requester
            .post('/api/users')
            .send(mockCreateUserDto)

          const { body } = await requester
            .get('/api/users/current')

          assert.equal(body?.payload?._id, registeredId)
        })
      })
    })
  })
})